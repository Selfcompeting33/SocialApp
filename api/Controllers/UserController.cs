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
using Microsoft.AspNetCore.Http;
using api.Extensions;
using System.Linq.Expressions;

namespace api.Controllers
{
  [Authorize]
  public class UserController : ApiBaseController
  {

    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IPhotoService _photoService;

    public UserController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService)
    {
      _photoService = photoService;
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
      var user = await _userRepository.GetUserByIdAsync(id);
      var returnUser = _mapper.Map<MemberDTO>(user);
      return Ok(returnUser);
    }
    [HttpGet]
    [Route("GetUser/{username}",Name="GetUser")]


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

      _mapper.Map(member, user);
      _userRepository.Update(user);
      if (await _userRepository.SaveAllAsync())
        return NoContent();
      return BadRequest("Update Failed");
    }

    [HttpPost("addPhotos")]
    public async Task<ActionResult<PhotoDTO>> AddPhoto(IFormFile File)

    {

      var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
      var result = await _photoService.AddPhotoAsync(File);
      if(result.Error!=null)
      return BadRequest(result.Error.Message);
      var photo=new Photo{
        
        Url=result.SecureUrl.AbsoluteUri,
        PublicId=result.PublicId
      };
    if(user.Photos.Count==0)
    { photo.IsMain=true;
    }
    user.Photos.Add(photo);
    if(await _userRepository.SaveAllAsync())
    {//return CreatedAtRoute("GetUser",_mapper.Map<PhotoDTO>(photo));
    return CreatedAtRoute("GetUser",new{username=user.UserName},_mapper.Map<PhotoDTO>(photo));
    }
    return BadRequest("Problem adding photo");



}
[HttpPut("setMainPhoto/{photoId}")]
public async Task<ActionResult> setMainPhoto(int photoId)
{ 
      var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
      var currentMainPhoto=user.Photos.FirstOrDefault(x=>x.IsMain==true);
      if(currentMainPhoto!=null)
      currentMainPhoto.IsMain=false;
    var photo=user.Photos.FirstOrDefault(x=>x.Id==photoId);
    if(photo!=null)
    photo.IsMain=true;
    if(currentMainPhoto==photo)
    {

 return BadRequest("This is already your main photo");

    }

    if(await _userRepository.SaveAllAsync())
    {
      return NoContent();
    }
    return BadRequest("Photo is not updated as main photo");
     
}
[HttpDelete("deletePhoto/{id}")]
public async Task<ActionResult> DeletePhoto(int id)
{
      var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
    Photo photo=user.Photos.FirstOrDefault(x=>x.Id==id);
    if(photo==null)
    return NotFound();
  
    if(photo.PublicId!=null)
    {
      
    var result =await _photoService.DeletePhotoAsync(photo.PublicId);
    if(result.Error!=null)
    return BadRequest(result.Error.Message);
    }
      user.Photos.Remove(photo);
 if(await _userRepository.SaveAllAsync())
 return Ok();
 return BadRequest("Failed to delete photo");

  
}



}
  }

