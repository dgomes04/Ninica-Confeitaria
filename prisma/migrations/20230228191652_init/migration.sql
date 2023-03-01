/*
  Warnings:

  - Added the required column `finished` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart` ADD COLUMN `finished` BOOLEAN NOT NULL,
    MODIFY `deletedAt` DATETIME(3) NULL,
    MODIFY `editedAt` DATETIME(3) NULL;
