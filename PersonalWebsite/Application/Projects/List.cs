using Application.Projects;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;
using Application.Core;

namespace Application.Projects
{
    public class List
    {
        public class Query : IRequest<Result<List<ProjectDto>>>
        {
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ProjectDto>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;
            private readonly IMapper _mapper;

            public Handler(DataContext context,
                            ILogger<List> logger,
                            IMapper mapper)
            {
                // We inject the datacontext as a depedancy 
                _context = context;
                _logger = logger;
                _mapper = mapper;
            }

            public async Task<Result<List<ProjectDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var test = new List<ProjectDto>();
                return Result<List<ProjectDto>>.Success(test);
            }
        }
    }
}
