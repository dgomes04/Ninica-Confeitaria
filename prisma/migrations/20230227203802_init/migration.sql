-- AlterTable
ALTER TABLE `product` MODIFY `categoriaId` INTEGER NOT NULL DEFAULT -1;

-- AlterTable
ALTER TABLE `user` MODIFY `deletedAt` DATETIME(3) NULL,
    MODIFY `editedAt` DATETIME(3) NULL;
