import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ProductModule } from './product/product.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    ProductModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.SEND_EMAIL_USER,
          pass: process.env.SEND_EMAIL_PASSWORD,
        },
      },
    }),
    EmailModule,
    CategoryModule,
    CartModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    EmailService,
  ],
})
export class AppModule {}
