using Application.About;
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
            CreateMap<Project, ProjectDto>();
        }
    }
}
