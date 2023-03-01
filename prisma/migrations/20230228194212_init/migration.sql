/*
  Warnings:

  - You are about to drop the column `cartsId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_userId_fkey`;

-- DropIndex
DROP INDEX `Product_cartsId_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `cartsId`;

-- CreateTable
CREATE TABLE `_CartsToUsers` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CartsToUsers_AB_unique`(`A`, `B`),
    INDEX `_CartsToUsers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CartsToUsers` ADD CONSTRAINT `_CartsToUsers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CartsToUsers` ADD CONSTRAINT `_CartsToUsers_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
