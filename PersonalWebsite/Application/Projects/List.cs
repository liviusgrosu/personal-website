using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects
{
    public class List
    {
        public class Query : IRequest<Result<List<ProjectDto>>>
        {
            public ProjectsFilter Param { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ProjectDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context,
                            IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<ProjectDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Projects.AsQueryable();
                var category = request.Param.Category.ToLower();

                if (category != "all")
                {
                    query = query.Where(p => p.Category == category);
                }

                var projects = await query
                    .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<ProjectDto>>.Success(projects);
            }
        }
    }
}
