/*
  Warnings:

  - You are about to drop the column `produtosId` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the `categoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdAt` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deletedAt` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `editedAt` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_type` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productsId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_produtosId_fkey`;

-- DropForeignKey
ALTER TABLE `categoria` DROP FOREIGN KEY `Categoria_produtosId_fkey`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `produtosId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL,
    ADD COLUMN `deletedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `editedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `payment_type` VARCHAR(191) NOT NULL,
    ADD COLUMN `productsId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `categoria`;

-- DropTable
DROP TABLE `products`;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `options` VARCHAR(191) NOT NULL DEFAULT '',
    `categoriaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `typo` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_productsId_fkey` FOREIGN KEY (`productsId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
