namespace GameStoreDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class orderchanges : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Orders", "TotalPrice", c => c.Double(nullable: false));
            AlterColumn("dbo.Orders", "OrderDate", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Orders", "OrderDate", c => c.DateTime(nullable: false));
            DropColumn("dbo.Orders", "TotalPrice");
        }
    }
}
