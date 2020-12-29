using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface IFavoriteService
    {
        List<Favorite> GetFavorites(string ip);
        bool AddFavorite(Favorite favorite);
        bool RemoveFavorite(int id);
    }
    public class FavoriteService : IFavoriteService
    {
        private DAL.Context db;

        public FavoriteService()
        {
            db = new DAL.Context();
        }
        public bool AddFavorite(Favorite favorite)
        {
            try
            {
                var user = db.Users.Include("Favorites").FirstOrDefault(p => p.Ip == favorite.UserIp);
                if (user == null)
                {
                    user = db.Users.Add(new DAL.User() { Ip = favorite.UserIp });
                    db.SaveChanges();
                }
                var city = db.Cities.First(p => p.Key == favorite.LocalKey);
                if (user.Favorites == null)
                    user.Favorites = new List<DAL.Favorite>();
                user.Favorites.Add(new DAL.Favorite() { City = city });
                db.SaveChanges();
                return true;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public List<Favorite> GetFavorites(string ip)
        {
            try
            {
                var favorites = db.Favorites.Include("City").Where(p => p.User.Ip == ip).ToList();
                List<Favorite> favoritesDto = new List<Favorite>();
                favorites.ForEach(f =>
                {
                    favoritesDto.Add(Convert(f));
                });
                return favoritesDto;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public bool RemoveFavorite(int id)
        {
            try
            {
                var favorite = db.Favorites.Find(id);
                if (favorite != null)
                    db.Favorites.Remove(favorite);
                return true;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        private Favorite Convert(DAL.Favorite favorite)
        {
            return new Favorite()
            {
                Id = favorite.Id,
                LocalKey = favorite.City.Key,
                CityName=favorite.City.LocalizedName
            };
        }
    }
}
