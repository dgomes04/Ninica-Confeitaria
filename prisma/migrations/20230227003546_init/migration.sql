/*
  Warnings:

  - You are about to alter the column `produtosId` on the `cart` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `products` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_produtosId_fkey`;

-- AlterTable
ALTER TABLE `cart` MODIFY `produtosId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `products` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_produtosId_fkey` FOREIGN KEY (`produtosId`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
