/*
  Warnings:

  - You are about to drop the column `BMW` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the column `Kia` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the column `Opel` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the column `Renault` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the column `Skoda` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the column `Toyota` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the column `Volvo` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the column `brand` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Added the required column `logoUrl` to the `brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandId` to the `car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `brand` DROP COLUMN `BMW`,
    DROP COLUMN `Kia`,
    DROP COLUMN `Opel`,
    DROP COLUMN `Renault`,
    DROP COLUMN `Skoda`,
    DROP COLUMN `Toyota`,
    DROP COLUMN `Volvo`,
    ADD COLUMN `logoUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `car` DROP COLUMN `brand`,
    ADD COLUMN `brandId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`,
    ADD COLUMN `firstname` VARCHAR(191) NOT NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL,
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` ENUM('USER', 'ADMIN') NOT NULL;

-- AddForeignKey
ALTER TABLE `car` ADD CONSTRAINT `car_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
