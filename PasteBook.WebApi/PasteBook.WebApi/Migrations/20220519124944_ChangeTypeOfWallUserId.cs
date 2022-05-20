using Microsoft.EntityFrameworkCore.Migrations;

namespace PasteBook.WebApi.Migrations
{
    public partial class ChangeTypeOfWallUserId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "WallUserId",
                table: "Posts",
                type: "int",
                nullable: true,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "WallUserId",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
