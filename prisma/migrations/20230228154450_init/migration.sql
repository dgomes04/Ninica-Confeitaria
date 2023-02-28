/*
  Warnings:

  - You are about to drop the column `categoryId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `categoryId`,
    ADD COLUMN `categoriaId` INTEGER NOT NULL DEFAULT -1;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
