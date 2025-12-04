/*
  Warnings:

  - You are about to drop the column `fueltype` on the `car` table. All the data in the column will be lost.
  - Added the required column `fueltypeId` to the `car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `car` DROP COLUMN `fueltype`,
    ADD COLUMN `fueltypeId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `fueltype` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `car` ADD CONSTRAINT `car_fueltypeId_fkey` FOREIGN KEY (`fueltypeId`) REFERENCES `fueltype`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
