using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects
{
    public class Details
    {
        public class Query : IRequest<Result<Project>>
        {
            public Guid ProjectId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Project>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Project>> Handle(Query request, CancellationToken cancellationToken)
            {
                var project = await _context.Projects
                    .FirstOrDefaultAsync(b => b.Id == request.ProjectId);

                if (project == null)
                {
                    return Result<Project>.Failure("Project not found");
                }

                return Result<Project>.Success(project);
            }
        }
    }
}
