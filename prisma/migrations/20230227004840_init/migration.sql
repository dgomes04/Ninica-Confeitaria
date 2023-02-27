/*
  Warnings:

  - You are about to drop the column `Address` on the `user` table. All the data in the column will be lost.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admin` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `Address`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `admin` BOOLEAN NOT NULL;
