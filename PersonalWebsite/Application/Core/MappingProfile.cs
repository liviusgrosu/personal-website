﻿using Application.About;
using Application.Blog;
using Application.Projects;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Domain.About, AboutDto>();
            CreateMap<BlogPost, BlogPost>();
            CreateMap<BlogPost, BlogPostDto>();
            CreateMap<Project, Project>();
            CreateMap<Project, ProjectDto>()
                .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.Tags.ToList()));
        }
    }
}
