-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'DISABLED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('FEMALE', 'MALE', 'NON_BINARY', 'PREFER_NOT_TO_SAY', 'SELF_DESCRIBE');

-- CreateEnum
CREATE TYPE "DateFormat" AS ENUM ('YYYY_MM_DD', 'DD_MM_YYYY', 'MM_DD_YYYY');

-- CreateEnum
CREATE TYPE "TimeFormat" AS ENUM ('HOUR_12', 'HOUR_24');

-- CreateEnum
CREATE TYPE "WeekStartsOn" AS ENUM ('MONDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "WeightUnit" AS ENUM ('KG', 'LB');

-- CreateEnum
CREATE TYPE "HeightUnit" AS ENUM ('CM', 'FT_IN');

-- CreateEnum
CREATE TYPE "DistanceUnit" AS ENUM ('KM', 'MI');

-- CreateEnum
CREATE TYPE "TemperatureUnit" AS ENUM ('CELSIUS', 'FAHRENHEIT');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('SYSTEM', 'LIGHT', 'DARK');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "displayName" TEXT,
    "dateOfBirth" DATE,
    "gender" "Gender",
    "bio" TEXT,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "dateFormat" "DateFormat" NOT NULL DEFAULT 'YYYY_MM_DD',
    "timeFormat" "TimeFormat" NOT NULL DEFAULT 'HOUR_24',
    "weekStartsOn" "WeekStartsOn" NOT NULL DEFAULT 'MONDAY',
    "weightUnit" "WeightUnit" NOT NULL DEFAULT 'KG',
    "heightUnit" "HeightUnit" NOT NULL DEFAULT 'CM',
    "distanceUnit" "DistanceUnit" NOT NULL DEFAULT 'KM',
    "temperatureUnit" "TemperatureUnit" NOT NULL DEFAULT 'CELSIUS',
    "theme" "Theme" NOT NULL DEFAULT 'SYSTEM',
    "language" TEXT NOT NULL DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_key" ON "UserPreference"("userId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
