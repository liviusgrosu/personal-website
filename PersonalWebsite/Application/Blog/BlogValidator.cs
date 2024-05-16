using Domain;
using FluentValidation;

namespace Application.Blog
{
    public class BlogValidator : AbstractValidator<BlogPost>
    {
        public BlogValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Content).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
        }
    }
}
