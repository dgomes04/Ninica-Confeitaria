/*
  Warnings:

  - Added the required column `cartsId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_productsId_fkey`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `cartsId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_cartsId_fkey` FOREIGN KEY (`cartsId`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
