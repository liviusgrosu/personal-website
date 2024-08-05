using Application.Core;
using AutoMapper;
using Common.Utils;
using Domain;
using FluentValidation;
using HtmlAgilityPack;
using MediatR;
using Persistence;

namespace Application.Projects
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Project Project { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Project).SetValidator(new ProjectValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var project = await _context.Projects.FindAsync(request.Project.Id);

                if (project == null)
                {
                    return Result<Unit>.Failure("Project not found");
                }

                request.Project.Content = QuillConverter.ConvertQuillDeltaToHtml(request.Project.Content);

                _mapper.Map(request.Project, project);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                {
                    return Result<Unit>.Failure("Failure to update the project");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
