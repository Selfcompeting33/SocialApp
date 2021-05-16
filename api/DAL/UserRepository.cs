using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using api.Interface;
using Microsoft.EntityFrameworkCore;
using api.DTO;
using AutoMapper.QueryableExtensions;
using AutoMapper;

namespace api.DAL
{
  public class UserRepository : IUserRepository
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public UserRepository(DataContext context, IMapper mapper)
    {
      _mapper = mapper;
      _context = context;
    }

    public async Task<IEnumerable<AppUser>> GetUserAsync()
    {
      return await _context.Users.ToListAsync();
    }

    public async Task<AppUser> GetUserByIdAsync(int id)
    {
      return await _context.Users.FindAsync(id);
    }

    public async Task<AppUser> GetUserByUsernameAsync(string username)
    {
      return await _context.Users.Include(p => p.Photos).SingleOrDefaultAsync(x => x.UserName == username);
    }

    public async Task<bool> SaveAllAsync()
    {
      return await _context.SaveChangesAsync() > 0;
    }

    public void Update(AppUser user)
    {
      _context.Entry(user).State = EntityState.Modified;
    }
    public async Task<MemberDTO> GetMemberAsync(string username)
    {

      return await _context.Users.Where(x => x.UserName == username).ProjectTo<MemberDTO>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();




    }
    
  public async Task<IEnumerable<MemberDTO>> GetMembersAsync()
    {


      return await _context.Users.ProjectTo<MemberDTO>(_mapper.ConfigurationProvider).ToListAsync();


    }
    
  }
}