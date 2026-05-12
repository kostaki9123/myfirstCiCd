-- CreateEnum
CREATE TYPE "PointRole" AS ENUM ('POINT', 'MOVING_BOX');

-- CreateEnum
CREATE TYPE "PlaceType" AS ENUM ('ACCOMMODATION', 'PLACE_TO_VISIT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tripName" TEXT NOT NULL,
    "tripBudget" TEXT NOT NULL,
    "travelingWith" TEXT NOT NULL,
    "tripTypes" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "genCurrency" TEXT NOT NULL,
    "budgetAmount" INTEGER NOT NULL,
    "budgetCurrency" TEXT NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "connectedToId" TEXT,
    "category" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "expenseCurrency" TEXT NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Point" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "role" "PointRole" NOT NULL,
    "index" INTEGER NOT NULL,
    "placeName" TEXT,
    "placeAddress" TEXT,
    "placeId" TEXT,
    "placeLat" DOUBLE PRECISION,
    "placeLng" DOUBLE PRECISION,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "fromName" TEXT,
    "fromAddress" TEXT,
    "fromPlaceId" TEXT,
    "fromLat" DOUBLE PRECISION,
    "fromLng" DOUBLE PRECISION,
    "toName" TEXT,
    "toAddress" TEXT,
    "toPlaceId" TEXT,
    "toLat" DOUBLE PRECISION,
    "toLng" DOUBLE PRECISION,
    "transportType" TEXT,
    "departureDate" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Place" (
    "internalId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "pointId" TEXT NOT NULL,
    "placeType" "PlaceType" NOT NULL,
    "name" TEXT NOT NULL,
    "googleMapLink" TEXT,
    "stayFrom" TIMESTAMP(3),
    "stayUntil" TIMESTAMP(3),
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "cost" DOUBLE PRECISION,
    "notes" TEXT,
    "paymentStatus" TEXT,
    "affiliatelink" TEXT,
    "visitDate" TIMESTAMP(3),
    "visitTime" TIMESTAMP(3),

    CONSTRAINT "Place_pkey" PRIMARY KEY ("internalId")
);

-- CreateTable
CREATE TABLE "PlaceAffiliateLink" (
    "id" SERIAL NOT NULL,
    "place_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "PhotoUrl" TEXT NOT NULL,
    "Priceperday" INTEGER NOT NULL,
    "LocationComments" TEXT,
    "Rating" INTEGER,
    "TypeOflodgindOrPlace" TEXT NOT NULL,
    "affiliate_url" TEXT NOT NULL,
    "description" TEXT,
    "source" TEXT NOT NULL,
    "compound_code" TEXT NOT NULL,
    "AvarageTime" TEXT,
    "OpenHours" TEXT,
    "AccomodationOrPlace" TEXT NOT NULL,
    "Reccomended" BOOLEAN NOT NULL,
    "MustSee" BOOLEAN,
    "HiddenSpot" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlaceAffiliateLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Trip_id_key" ON "Trip"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Budget_tripId_key" ON "Budget"("tripId");

-- CreateIndex
CREATE UNIQUE INDEX "Expense_id_key" ON "Expense"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Expense_connectedToId_key" ON "Expense"("connectedToId");

-- CreateIndex
CREATE UNIQUE INDEX "Point_id_key" ON "Point"("id");

-- CreateIndex
CREATE INDEX "Place_pointId_idx" ON "Place"("pointId");

-- CreateIndex
CREATE UNIQUE INDEX "Place_id_pointId_key" ON "Place"("id", "pointId");

-- CreateIndex
CREATE UNIQUE INDEX "PlaceAffiliateLink_place_id_key" ON "PlaceAffiliateLink"("place_id");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_connectedToId_fkey" FOREIGN KEY ("connectedToId") REFERENCES "Place"("internalId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_pointId_fkey" FOREIGN KEY ("pointId") REFERENCES "Point"("id") ON DELETE CASCADE ON UPDATE CASCADE;
