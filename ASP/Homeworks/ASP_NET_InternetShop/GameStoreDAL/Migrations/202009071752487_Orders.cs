namespace GameStoreDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Orders : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Orders",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        OrderDate = c.DateTime(nullable: false),
                        IsDone = c.Boolean(nullable: false),
                        GameStoreUser_Id = c.String(maxLength: 128),
                        OrderStatus_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.GameStoreUser_Id)
                .ForeignKey("dbo.OrderStatus", t => t.OrderStatus_Id)
                .Index(t => t.GameStoreUser_Id)
                .Index(t => t.OrderStatus_Id);
            
            CreateTable(
                "dbo.OrderStatus",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Games", "Order_Id", c => c.Int());
            AddColumn("dbo.AspNetRoles", "Discriminator", c => c.String(nullable: false, maxLength: 128));
            AddColumn("dbo.AspNetUsers", "FirstName", c => c.String());
            AddColumn("dbo.AspNetUsers", "LastName", c => c.String());
            AddColumn("dbo.AspNetUsers", "Discriminator", c => c.String(nullable: false, maxLength: 128));
            AddColumn("dbo.AspNetUsers", "GameStoreRole_Id", c => c.String(maxLength: 128));
            CreateIndex("dbo.Games", "Order_Id");
            CreateIndex("dbo.AspNetUsers", "GameStoreRole_Id");
            AddForeignKey("dbo.AspNetUsers", "GameStoreRole_Id", "dbo.AspNetRoles", "Id");
            AddForeignKey("dbo.Games", "Order_Id", "dbo.Orders", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Orders", "OrderStatus_Id", "dbo.OrderStatus");
            DropForeignKey("dbo.Orders", "GameStoreUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Games", "Order_Id", "dbo.Orders");
            DropForeignKey("dbo.AspNetUsers", "GameStoreRole_Id", "dbo.AspNetRoles");
            DropIndex("dbo.Orders", new[] { "OrderStatus_Id" });
            DropIndex("dbo.Orders", new[] { "GameStoreUser_Id" });
            DropIndex("dbo.AspNetUsers", new[] { "GameStoreRole_Id" });
            DropIndex("dbo.Games", new[] { "Order_Id" });
            DropColumn("dbo.AspNetUsers", "GameStoreRole_Id");
            DropColumn("dbo.AspNetUsers", "Discriminator");
            DropColumn("dbo.AspNetUsers", "LastName");
            DropColumn("dbo.AspNetUsers", "FirstName");
            DropColumn("dbo.AspNetRoles", "Discriminator");
            DropColumn("dbo.Games", "Order_Id");
            DropTable("dbo.OrderStatus");
            DropTable("dbo.Orders");
        }
    }
}
