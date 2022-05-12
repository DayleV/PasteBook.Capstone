using Microsoft.EntityFrameworkCore.Migrations;

namespace PasteBook.WebApi.Migrations
{
    public partial class UserFriendStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "UserFriends",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "UserFriends");
        }
    }
}
