using Microsoft.EntityFrameworkCore.Migrations;

namespace PasteBook.WebApi.Migrations
{
    public partial class AddTimelineTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TimelineId",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Timelines",
                columns: table => new
                {
                    TimelineId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Timelines", x => x.TimelineId);
                    table.ForeignKey(
                        name: "FK_Timelines_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Posts_TimelineId",
                table: "Posts",
                column: "TimelineId");

            migrationBuilder.CreateIndex(
                name: "IX_Timelines_UserId",
                table: "Timelines",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Timelines_TimelineId",
                table: "Posts",
                column: "TimelineId",
                principalTable: "Timelines",
                principalColumn: "TimelineId",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Timelines_TimelineId",
                table: "Posts");

            migrationBuilder.DropTable(
                name: "Timelines");

            migrationBuilder.DropIndex(
                name: "IX_Posts_TimelineId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "TimelineId",
                table: "Posts");
        }
    }
}
