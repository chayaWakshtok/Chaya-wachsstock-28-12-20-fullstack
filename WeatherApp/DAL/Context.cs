using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Context : DbContext
    {
        public Context() : base("WeatherDB")
        {
            Database.SetInitializer<Context>(new CreateDatabaseIfNotExists<Context>());
        }

        public DbSet<City> Cities { get; set; }
        public DbSet<Weather> Weathers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
    }
}
