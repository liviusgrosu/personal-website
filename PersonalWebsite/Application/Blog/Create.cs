using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Blog
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public BlogPost BlogPost { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.BlogPost).SetValidator(new BlogValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.BlogPosts.Add(request.BlogPost);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                {
                    return Result<Unit>.Failure("Failure to create a blog post");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
