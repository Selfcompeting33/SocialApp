using System.ComponentModel.DataAnnotations;

namespace api.DTO
{
    public class LoginDTO
    {    [Required]
        public string username{get;set;}
        [Required]
    public string password { get; set; }

    }
}