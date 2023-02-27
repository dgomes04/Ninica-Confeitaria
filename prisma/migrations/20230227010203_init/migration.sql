/*
  Warnings:

  - You are about to alter the column `options` on the `products` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `options` VARCHAR(191) NOT NULL DEFAULT '';
