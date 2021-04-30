using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DAL;
using api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
    public class UserController:ControllerBase
    {    private readonly DataContext _Context;
    public UserController(DataContext Context)
    { _Context=Context;
    }
  
    [HttpGet]
    [Route("GetUsers")]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    
    {

      return await _Context.Users.ToListAsync();

    }

    //  [HttpGet("{id}")]
    [HttpGet]
 [Route("GetUser/{id}")]
  public async Task<ActionResult<AppUser>> GetUser(int id)
  {

    return await  _Context.Users.FindAsync(id);

  }
}
}