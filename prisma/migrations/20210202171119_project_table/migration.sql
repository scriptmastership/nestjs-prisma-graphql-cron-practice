-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "project_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" JSONB NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project.project_id_unique" ON "Project"("project_id");
