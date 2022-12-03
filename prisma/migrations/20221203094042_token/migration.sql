-- CreateTable
CREATE TABLE "userToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT,
    "userId" TEXT,

    CONSTRAINT "userToken_pkey" PRIMARY KEY ("id")
);
