using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Blog
{
    public class Details
    {
        public class Query : IRequest<Result<BlogPost>>
        {
            public Guid BlogId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<BlogPost>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
            }

            public async Task<Result<BlogPost>> Handle(Query request, CancellationToken cancellationToken)
            {
                var blog = await _context.BlogPosts
                    .FirstOrDefaultAsync(b => b.Id == request.BlogId);

                if (blog == null)
                {
                    return Result<BlogPost>.Failure("Blog post not found");
                }

                return Result<BlogPost>.Success(blog);
            }
        }
    }
}
