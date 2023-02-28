import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async enviarEmail() {
    await this.mailerService
      .sendMail({
        to: 'gdavi989@gmail.com',
        from: 'gdavi134@gmail.com',
        subject: 'Confirme sua conta da Ninica confeitaria',
        text: 'Esse email é gerado automáticamente para que você possa realizar seus pedidos em nosso site',
        html: '<h1>Hello world!</h1>',
      })
      .then(() => {})
      .catch(() => {
        throw new Error('An error ocurred while sending confirmation email');
      });
  }
}
