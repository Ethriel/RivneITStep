namespace StoreCS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_info_8 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.UserAddInfoes",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        FirstName = c.String(nullable: false),
                        LastName = c.String(nullable: false),
                        Image = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.Id)
                .Index(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserAddInfoes", "Id", "dbo.AspNetUsers");
            DropIndex("dbo.UserAddInfoes", new[] { "Id" });
            DropTable("dbo.UserAddInfoes");
        }
    }
}
