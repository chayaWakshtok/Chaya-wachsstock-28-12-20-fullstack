using DTO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;

namespace BL
{
    public interface IWeatherService
    {
        Task<List<City>> GetCitiesAsync(string city);
        Task<Weather> GetWeather(string localKey);
    }
    public class WeatherService : IWeatherService
    {
        private DAL.Context db;
        private HttpClient _httpClient;
        private string _apiKey;

        public WeatherService()
        {
            db = new DAL.Context();
            _httpClient = new HttpClient();
            _apiKey = WebConfigurationManager.AppSettings["ApiKey"];
        }
        public async Task<List<City>> GetCitiesAsync(string city)
        {
            try
            {
                List<City> rawWeather = new List<City>();
                this._httpClient.BaseAddress = new Uri("http://dataservice.accuweather.com/locations/v1/cities/autocomplete");
                var response = await _httpClient.GetAsync($"?apikey={_apiKey}&q={city}&language=en-us");
                var stringResult = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<List<City>>(stringResult);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Weather> GetWeather(string localKey)
        {
            try
            {
                var cityDB = db.Cities.Include("Weathers").FirstOrDefault(p => p.Key == localKey);
                if (cityDB != null)
                {
                    var weatherDB = cityDB.Weathers.FirstOrDefault(p => p.LocalObservationDateTime > DateTime.Now.AddMinutes(-30));
                    if (weatherDB != null)
                        return new Weather()
                        {
                            LocalObservationDateTime = weatherDB.LocalObservationDateTime,
                            WeatherText = weatherDB.WeatherText,
                            Temperature = new Temperature() { Metric = new Metric() { Value = weatherDB.TemperatureValue } }
                        };
                }
                this._httpClient.BaseAddress = new Uri("http://dataservice.accuweather.com/currentconditions/v1/");
                var response = await _httpClient.GetAsync($"{localKey}?apikey={_apiKey}&language=en-us&details=false");
                var stringResult = await response.Content.ReadAsStringAsync();
                List<Weather> weathers = JsonConvert.DeserializeObject<List<Weather>>(stringResult);
                if (weathers != null && weathers.Count > 0)
                {
                    if (cityDB == null)
                    {
                        cityDB = db.Cities.Add(new DAL.City() { Key = localKey });
                        db.SaveChanges();
                    }
                    if (cityDB.Weathers == null)
                        cityDB.Weathers = new List<DAL.Weather>();
                    cityDB.Weathers.Add(new DAL.Weather()
                    {
                        LocalObservationDateTime = weathers[0].LocalObservationDateTime,
                        TemperatureValue = weathers[0].Temperature.Metric.Value,
                        WeatherText=weathers[0].WeatherText
                    });
                    db.SaveChanges();
                    return weathers.First();
                }

                return new Weather();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
