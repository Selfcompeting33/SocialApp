using api.DAL;
using api.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
  public class ErrorController : ApiBaseController
  {
    private readonly DataContext _context;
    public ErrorController(DataContext context)
    {
      _context = context;

    }
    [Authorize]
    [HttpGet("auth")]
    public ActionResult<string> GetSecret()
    {
        return "secret text";


  }
    
    [HttpGet("not-found")]
    public ActionResult<AppUser> GetNotFound()
    { var thing =_context.Users.Find(-1);
    if(thing==null)
    return NotFound();
      return Ok(thing);


    }
    [HttpGet("server-error")]
    public ActionResult<string> GetServerError()
    {var thing = _context.Users.Find(-1);
    var thingtoreturn=thing.ToString();

      return thingtoreturn;


    }
    [HttpGet("bad-request")]
    public ActionResult<string> GetBadRequest()
    {
      

      return BadRequest("This is a Bad request");


    }
     


    }
}