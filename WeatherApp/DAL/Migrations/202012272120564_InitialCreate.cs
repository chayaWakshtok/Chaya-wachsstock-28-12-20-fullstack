namespace DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Cities",
                c => new
                    {
                        CityId = c.Int(nullable: false, identity: true),
                        Rank = c.Int(nullable: false),
                        Key = c.String(),
                        LocalizedName = c.String(),
                    })
                .PrimaryKey(t => t.CityId);
            
            CreateTable(
                "dbo.Weathers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LocalObservationDateTime = c.DateTime(nullable: false),
                        WeatherText = c.String(),
                        TemperatureValue = c.String(),
                        City_CityId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Cities", t => t.City_CityId)
                .Index(t => t.City_CityId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Weathers", "City_CityId", "dbo.Cities");
            DropIndex("dbo.Weathers", new[] { "City_CityId" });
            DropTable("dbo.Weathers");
            DropTable("dbo.Cities");
        }
    }
}
