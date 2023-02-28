/*
  Warnings:

  - Added the required column `produtosId` to the `Categoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categoria` ADD COLUMN `produtosId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Categoria` ADD CONSTRAINT `Categoria_produtosId_fkey` FOREIGN KEY (`produtosId`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
