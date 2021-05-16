using System;
using Microsoft.AspNetCore.Components.RenderTree;

namespace api.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime dob)
        {
var today=DateTime.Today;
var age=0;
if(today.Month<dob.Month)
 age=today.Year-dob.Year-1;
 else if(today.Month ==dob.Month)
 {if (today.Date < dob.Date)
          age = today.Year - dob.Year - 1;
          else
         { age = today.Year - dob.Year ;
         }
 }
 else{age = today.Year - dob.Year;

 }
 return age;


        }
    }
}