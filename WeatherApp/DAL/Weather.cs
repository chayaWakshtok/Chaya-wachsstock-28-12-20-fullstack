using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Weather
    {
        [Key]
        public int Id { get; set; }
        public DateTime LocalObservationDateTime { get; set; }
        public string WeatherText { get; set; }
        public string TemperatureValue { get; set; }
    }
}
