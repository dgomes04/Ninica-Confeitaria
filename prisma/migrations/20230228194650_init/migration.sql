/*
  Warnings:

  - You are about to drop the `_cartstousers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `usersId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_cartstousers` DROP FOREIGN KEY `_CartsToUsers_A_fkey`;

-- DropForeignKey
ALTER TABLE `_cartstousers` DROP FOREIGN KEY `_CartsToUsers_B_fkey`;

-- DropIndex
DROP INDEX `Cart_userId_fkey` ON `cart`;

-- AlterTable
ALTER TABLE `cart` ADD COLUMN `usersId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_cartstousers`;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
