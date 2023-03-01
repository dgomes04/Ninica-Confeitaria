/*
  Warnings:

  - You are about to drop the `_cartstoproducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_cartstoproducts` DROP FOREIGN KEY `_CartsToProducts_A_fkey`;

-- DropForeignKey
ALTER TABLE `_cartstoproducts` DROP FOREIGN KEY `_CartsToProducts_B_fkey`;

-- DropTable
DROP TABLE `_cartstoproducts`;

-- CreateTable
CREATE TABLE `ProductOnCart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productsId` INTEGER NOT NULL,
    `cartsId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductOnCart` ADD CONSTRAINT `ProductOnCart_productsId_fkey` FOREIGN KEY (`productsId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOnCart` ADD CONSTRAINT `ProductOnCart_cartsId_fkey` FOREIGN KEY (`cartsId`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
