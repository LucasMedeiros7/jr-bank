-- CreateTable
CREATE TABLE "accounts" (
    "account_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 50000,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "transfers" (
    "transferId" TEXT NOT NULL PRIMARY KEY,
    "account_origin_id" TEXT NOT NULL,
    "account_destination_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_cpf_key" ON "accounts"("cpf");
