-- CreateTable
CREATE TABLE "Qoutes" (
    "id" TEXT NOT NULL,
    "qoutes" TEXT NOT NULL,
    "totalLikes" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "enabledBy" TEXT,
    "enabledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disabledBy" TEXT,
    "disabledAt" TIMESTAMP(3),

    CONSTRAINT "Qoutes_pkey" PRIMARY KEY ("id")
);
