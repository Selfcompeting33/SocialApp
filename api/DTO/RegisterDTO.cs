using System.ComponentModel.DataAnnotations;

namespace api.DTO
{
    public class RegisterDTO
    {    [Required]
        public string userName{get;set;}
  
    [Required]    
      public string password{get;set;}
    }
}