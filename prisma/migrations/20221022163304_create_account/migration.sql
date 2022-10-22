-- CreateTable
CREATE TABLE "Account" (
    "account_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_cpf_key" ON "Account"("cpf");
