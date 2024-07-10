using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Project
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string Image { get; set; }
        public string Category { get; set; }
        public ICollection<string> Tags { get; set; }
    }
}
