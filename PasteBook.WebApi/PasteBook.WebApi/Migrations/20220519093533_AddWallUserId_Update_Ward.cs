using Microsoft.EntityFrameworkCore.Migrations;

namespace PasteBook.WebApi.Migrations
{
    public partial class AddWallUserId_Update_Ward : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "WallUserId",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WallUserId",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WallUserId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "WallUserId",
                table: "Posts");
        }
    }
}
