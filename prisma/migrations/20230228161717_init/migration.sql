-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_categoriaId_fkey`;

-- AlterTable
ALTER TABLE `product` MODIFY `categoriaId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
