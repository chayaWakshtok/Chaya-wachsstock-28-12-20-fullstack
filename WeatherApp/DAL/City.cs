using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class City
    {
        [Key]
        public int CityId { get; set; }
        public int Rank { get; set; }
        public string Key { get; set; }
        public string LocalizedName { get; set; }
        public List<Weather> Weathers { get; set; }
    }
}
