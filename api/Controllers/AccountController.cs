using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using api.DAL;
using api.DTO;
using api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Services;
using Microsoft.Extensions.Configuration;
using System.Security.Cryptography.X509Certificates;
using api.Interface;
using Microsoft.AspNetCore.Authentication;

namespace api.Controllers
{
    public class AccountController:ApiBaseController
    { 
        private readonly  DataContext _context;
    private readonly ITokenService _tokenService;
        public AccountController(DataContext context,ITokenService tokenService)
        {_context=context;
            _tokenService=tokenService;
 }
    [HttpPost("Register")]
  
    public async Task<ActionResult<UserDTO>> URegister(RegisterDTO registerDTO)
    { 

      if(ModelState.IsValid)
   {   if (await UserExists(registerDTO.userName))
      {
        return BadRequest("Username is already taken");
      }
      using var hmac = new HMACSHA512();


      var user = new AppUser()
      {
        UserName = registerDTO.userName.ToLower(),
        PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.password)),
        PasswordSalt = hmac.Key


      };

      _context.Users.Add(user);
      await _context.SaveChangesAsync();
      return new UserDTO()
      {
        
        Username= registerDTO.userName,
        Token=_tokenService.CreateToken(user)
      };

    }
    return BadRequest();
    }
    private async Task<bool> UserExists(string username)
    {
 return await _context.Users.AnyAsync(x=>x.UserName==username.ToLower());

    }

    [HttpPost("Login")]

    public async Task<ActionResult<UserDTO>> ULogin(LoginDTO loginDTO)
    {

      if (ModelState.IsValid)
      {  var user=await _context.Users.SingleOrDefaultAsync(x=>x.UserName==loginDTO.username);
       if(user==null)
       return NotFound("Username is invalid");

        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.password));
        for(int i=0;i<computedHash.Length;i++)
        if(computedHash[i]!=user.PasswordHash[i])
        return Unauthorized("Invalid Password");
   
      
       return new UserDTO{ Username=user.UserName,
       Token=_tokenService.CreateToken(user)

       };
     
       

        }

    return NotFound();

      }
    
    

  }
}