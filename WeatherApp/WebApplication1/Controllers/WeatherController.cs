using BL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Weather.Controllers
{
    [RoutePrefix("api/Weather")]
    public class WeatherController : ApiController
    {
        private readonly IWeatherService _weatherService;

        public WeatherController(IWeatherService wetherService)
        {
            _weatherService = wetherService;
        }

        [HttpGet]
        [Route("GetCities")]
        public async Task<IHttpActionResult> City(string city)
        {
            try
            {
                List<City> cities = await _weatherService.GetCitiesAsync(city);
                return Ok(cities);
            }
            catch (HttpRequestException httpRequestException)
            {
                return BadRequest($"Error getting cities from accuweather: {httpRequestException.Message}");
            }
        }

        [HttpGet]
        [Route("GetWeather")]
        public async Task<IHttpActionResult> GetWeather(string localKey)
        {
            try
            {
                DTO.Weather weather = await _weatherService.GetWeather(localKey);
                return Ok(weather);
            }
            catch (HttpRequestException httpRequestException)
            {
                return BadRequest($"Error getting weather from accuweather: {httpRequestException.Message}");
            }
        }
    }
}
