using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Blog
{
    public class List
    {
        public class Query : IRequest<Result<List<BlogPostDto>>>{ }

        public class Handler : IRequestHandler<Query, Result<List<BlogPostDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<BlogPostDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var blogs = await _context.BlogPosts
                    .OrderByDescending(p => p.Date)
                    .ProjectTo<BlogPostDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
                
                return Result<List<BlogPostDto>>.Success(blogs);
            }
        }
    }
}
