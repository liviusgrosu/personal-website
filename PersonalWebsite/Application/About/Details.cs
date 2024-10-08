﻿using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.About
{
    public class Details
    {
        public class Query : IRequest<Result<string>> { }

        public class Handler : IRequestHandler<Query, Result<string>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<string>> Handle(Query request, CancellationToken cancellationToken)
            {
                var content = await _context.AboutEntry
                    .ProjectTo<AboutDto>(_mapper.ConfigurationProvider)
                    .Select(x => x.Content)
                    .FirstOrDefaultAsync(cancellationToken);

                return Result<string>.Success(content ?? string.Empty);
            }
        }
    }
}
