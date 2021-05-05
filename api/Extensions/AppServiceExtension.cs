using System.Text;
using api.DAL;
using api.Interface;
using api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace api.Extensions
{
    public static class AppServiceExtension
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services,IConfiguration _Config)
    {
    
      services.AddDbContext<DataContext>(Options =>
      {
        Options.UseSqlServer(_Config.GetConnectionString("DefaultConnection"));
      });

      services.AddScoped<ITokenService, TokenService>();
            return services;
    }
}
}