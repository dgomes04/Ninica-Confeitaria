/*
  Warnings:

  - Added the required column `deletedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `editedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tel` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `confirmed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `deletedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `editedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `tel` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
