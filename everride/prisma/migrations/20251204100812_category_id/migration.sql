/*
  Warnings:

  - You are about to drop the column `category` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `PassengerCar` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `Truck` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `Van` on the `category` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `car` DROP COLUMN `category`,
    ADD COLUMN `categoryId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `PassengerCar`,
    DROP COLUMN `Truck`,
    DROP COLUMN `Van`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `car` ADD CONSTRAINT `car_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
