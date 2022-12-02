-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(320),
    "password" TEXT,
    "username" VARCHAR(240),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userFavorites" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "playerId" INTEGER,

    CONSTRAINT "userFavorites_pkey" PRIMARY KEY ("id")
);
