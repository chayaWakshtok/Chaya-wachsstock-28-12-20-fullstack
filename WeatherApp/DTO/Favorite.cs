using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class Favorite
    {
        public int Id { get; set; }
        public string LocalKey { get; set; }
        public string CityName { get; set; }
        public string UserIp { get; set; }
    }
}
