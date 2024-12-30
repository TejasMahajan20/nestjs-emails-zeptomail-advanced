import { Injectable } from '@nestjs/common';
import { MailService } from './modules/mail/mail.service';

@Injectable()
export class AppService {
  constructor(
    private readonly mailService: MailService
  ) { }
  
  getHello(): string {
    return 'Hello World!';
  }

  async sendMail(email: string): Promise<void> {
    await this.mailService.sendOtpEmail(email, "123456", "Test")
  }
}
