using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Favorite
    {
        [Key]
        public int Id { get; set; }
        public City City { get; set; }
        public User User { get; set; }
    }
}
