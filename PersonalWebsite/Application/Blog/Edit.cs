using Application.Core;
using AutoMapper;
using Common.Utils;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Blog
{
    public class Edit
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
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var blogPost = await _context.BlogPosts.FindAsync(request.BlogPost.Id);

                if (blogPost == null)
                {
                    return Result<Unit>.Failure("Blog post not found");
                }

                request.BlogPost.Content = QuillConverter.ConvertQuillDeltaToHtml(request.BlogPost.Content);

                _mapper.Map(request.BlogPost, blogPost);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                {
                    return Result<Unit>.Failure("Failure to update the blog post");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
