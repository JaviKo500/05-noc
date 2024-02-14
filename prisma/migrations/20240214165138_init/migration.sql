-- CreateEnum
CREATE TYPE "SeverityLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "LogModelNoc" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "level" "SeverityLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogModelNoc_pkey" PRIMARY KEY ("id")
);
