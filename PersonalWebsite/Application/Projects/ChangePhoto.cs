using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Projects
{
    public class ChangePhoto
    {
        public class Command : IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; }
            public Guid ProjectId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _context = context;
                _photoAccessor = photoAccessor;
            }

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var project = await _context.Projects
                    .FirstOrDefaultAsync(b => b.Id == request.ProjectId);

                if (project == null)
                {
                    return Result<Photo>.Failure("Project not found");
                }

                var photoUploadREsult = await _photoAccessor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Url = photoUploadREsult.Url,
                    Id = photoUploadREsult.PublicId,
                };

                _context.Photos.Add(photo);
                project.Image = photo.Url;

                var result = await _context.SaveChangesAsync() > 0;
                if (result)
                {
                    return Result<Photo>.Success(photo);
                }
                return Result<Photo>.Failure("Problem uploading photo");
            }
        }
    }
}
