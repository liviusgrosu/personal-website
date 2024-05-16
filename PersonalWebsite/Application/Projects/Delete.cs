using Application.Core;
using MediatR;
using Persistence;

namespace Application.Projects
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var project = await _context.Projects.FindAsync(request.Id);

                if (project == null)
                {
                    return Result<Unit>.Failure("Project not found");
                }

                _context.Remove(project);

                var results = await _context.SaveChangesAsync() > 0;

                if (!results)
                {
                    return Result<Unit>.Failure("Failed to delete the project");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
