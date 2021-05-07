using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using api.DAL;
using api.Entities;
using System.Security.Cryptography;
using System.Text.Unicode;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{
    public class UserController : ApiBaseController
    {
        private readonly DataContext _Context;

        public UserController(DataContext Context)
        {
            _Context = Context;
        }

        [HttpGet]
        [Route("GetUsers")]
       // [Authorize]
       [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return await _Context.Users.ToListAsync();
        }

        //  [HttpGet("{id}")]
        [HttpGet]
        [Route("GetUser/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _Context.Users.FindAsync(id);
        }
      
    }
}
