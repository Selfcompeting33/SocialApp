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
using api.Interface;
using api.DTO;
using AutoMapper;
using System.Security.Claims;

namespace api.Controllers
{
 [Authorize]
  public class UserController : ApiBaseController
  {

    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UserController(IUserRepository userRepository, IMapper mapper)
    {
      _mapper = mapper;
      _userRepository = userRepository;

    }

    [HttpGet]
    [Route("GetUsers")]

    public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
    {
      return Ok(await _userRepository.GetMembersAsync());
  
     
    }

    //  [HttpGet("{id}")]
    [HttpGet]
    [Route("GetUserById/{id}")]

    public async Task<ActionResult<MemberDTO>> GetUser(int id)
    {
      var user= await _userRepository.GetUserByIdAsync(id);
      var returnUser=_mapper.Map<MemberDTO>(user);
      return Ok(returnUser);
    }
    [HttpGet]
    [Route("GetUser/{username}")]


    public async Task<ActionResult<MemberDTO>> GetUser(string username)
    {
      return await _userRepository.GetMemberAsync(username);
    
    }
     [HttpPut]
    [Route("UpdateUser")]


    public async Task<ActionResult> UpdateUser(MemberUpdateDTO member)
    {

      var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
      var user = await _userRepository.GetUserByUsernameAsync(username);
     
     _mapper.Map(member,user);
      _userRepository.Update(user);
     if( await _userRepository.SaveAllAsync())
      return NoContent();
      return BadRequest("Update Failed");
    }

  }
}
