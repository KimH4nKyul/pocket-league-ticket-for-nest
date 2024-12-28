-- CreateEnum
CREATE TYPE "PointUsageType" AS ENUM ('CHARGE', 'USE');

-- CreateTable
CREATE TABLE "WaitList" (
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entryTime" TIMESTAMP(3) NOT NULL,
    "exitTime" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "WaitListPositioner" (
    "id" SERIAL NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "WaitListPositioner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "point" INTEGER NOT NULL,
    "type" "PointUsageType" NOT NULL DEFAULT 'CHARGE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PointHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WaitList_token_key" ON "WaitList"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_key" ON "Wallet"("userId");
