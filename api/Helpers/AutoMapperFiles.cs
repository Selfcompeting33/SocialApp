using System.Linq;
using api.DTO;
using api.Entities;
using api.Extensions;
using AutoMapper;

namespace api.Helpers
{
  public class AutoMapperFiles : Profile
  {
    public AutoMapperFiles()
    { CreateMap<AppUser,MemberDTO>()
    .ForMember(dest=>dest.PhototUrl,opt=>opt.MapFrom(src=>src.Photos.FirstOrDefault(x=>x.IsMain).Url))
    .ForMember(dest=>dest.Age,opt=>opt.MapFrom(src=>src.DateOfBirth.CalculateAge()));
      CreateMap<Photo, PhotoDTO>();

    }
  }
}