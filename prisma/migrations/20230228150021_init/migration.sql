/*
  Warnings:

  - You are about to drop the column `typo` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `categoriaId` on the `product` table. All the data in the column will be lost.
  - Added the required column `type` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_categoriaId_fkey`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `typo`,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `categoriaId`,
    ADD COLUMN `categoryId` INTEGER NOT NULL DEFAULT -1;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
