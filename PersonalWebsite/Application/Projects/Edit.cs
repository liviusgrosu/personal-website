using Application.Core;
using AutoMapper;
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

                var doc = new HtmlAgilityPack.HtmlDocument();
                doc.LoadHtml(request.Project.Content);

                var iframeNode = doc.DocumentNode.SelectSingleNode("//iframe[@class='ql-video']");
                if (iframeNode != null)
                {
                    iframeNode.SetAttributeValue("class", "responsive-iframe");

                    var divNode = HtmlNode.CreateNode("<div></div>");
                    divNode.SetAttributeValue("class", "videoContainer");

                    divNode.AppendChild(iframeNode.CloneNode(true));
                    iframeNode.ParentNode.ReplaceChild(divNode, iframeNode);

                    request.Project.Content = doc.DocumentNode.OuterHtml;
                }

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
