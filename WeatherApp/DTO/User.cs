using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class User
    {
        public int Id { get; set; }
        public string Ip { get; set; }
        public List<Favorite> Favorites { get; set; }
    }
}
