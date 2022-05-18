using Microsoft.EntityFrameworkCore.Migrations;

namespace PasteBook.WebApi.Migrations
{
    public partial class AddRequesterIdInUserFriend : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RequesterId",
                table: "UserFriends",
                type: "int",
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "RequesterId",
                table: "UserFriends",
                type: "bit",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
