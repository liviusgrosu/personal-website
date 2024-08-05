using Application.Core;
using Common.Utils;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.About
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public AboutDto Content { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private DataContext _context { get; }

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var currentAbout = await _context.AboutEntry.FirstAsync();

                if (currentAbout == null)
                {
                    return null;
                }

                currentAbout.Content = QuillConverter.ConvertQuillDeltaToHtml(request.Content.Content);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                {
                    return Result<Unit>.Failure("Failure to update about page");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
