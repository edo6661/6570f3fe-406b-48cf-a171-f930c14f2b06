-- CreateEnum
CREATE TYPE "Position" AS ENUM ('CEO', 'CTO', 'CONTROLLER', 'CFO', 'SALES', 'MARKETING', 'HR', 'IT');

-- CreateTable
CREATE TABLE "data" (
    "id" STRING NOT NULL,
    "firstName" STRING NOT NULL,
    "lastName" STRING NOT NULL,
    "position" "Position" NOT NULL DEFAULT 'SALES',
    "phone" STRING NOT NULL,
    "email" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "data_id_key" ON "data"("id");
