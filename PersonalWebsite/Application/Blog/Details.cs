using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Blog
{
    public class Details
    {
        public class Query : IRequest<Result<BlogPostDto>>
        {
            public Guid BlogId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<BlogPostDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<BlogPostDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var blog = await _context.BlogPosts
                    .ProjectTo<BlogPostDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(b => b.Id == request.BlogId);

                if (blog == null)
                {
                    return null;
                }

                return Result<BlogPostDto>.Success(blog);
            }
        }
    }
}
