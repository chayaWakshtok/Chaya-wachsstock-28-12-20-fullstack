namespace DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Favorites",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        City_CityId = c.Int(),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Cities", t => t.City_CityId)
                .ForeignKey("dbo.Users", t => t.User_Id)
                .Index(t => t.City_CityId)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Ip = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Favorites", "User_Id", "dbo.Users");
            DropForeignKey("dbo.Favorites", "City_CityId", "dbo.Cities");
            DropIndex("dbo.Favorites", new[] { "User_Id" });
            DropIndex("dbo.Favorites", new[] { "City_CityId" });
            DropTable("dbo.Users");
            DropTable("dbo.Favorites");
        }
    }
}
