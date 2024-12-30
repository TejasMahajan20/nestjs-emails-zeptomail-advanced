import { Injectable } from '@nestjs/common';
import { ZeptoMailClient } from './zepto-mail-client';

@Injectable()
export class MailService {
    constructor(private readonly zeptoMailClient: ZeptoMailClient) { }

    async sendOTP(
        email: string,
        OTP: string,
        name?: string
    ) {
        const templateKey = process.env.ZEPTO_MAIL_OTP_TEMPLATE_KEY;
        const appName = process.env.APP_NAME;

        const merge_info = {
            name,
            OTP,
            team: appName,
            product_name: appName
        };

        const subject = process.env.ZEPTO_MAIL_OTP_EMAIL_SUBJECT;

        await this.zeptoMailClient.sendMail(templateKey, email, merge_info, subject);
    }

    async sendVerificationLink(
        email: string, 
        passwordSetLink: string, 
        name?: string
    ) {
        const templateKey = process.env.ZEPTO_MAIL_VERIFICATION_LINK_TEMPLATE_KEY;
        const appName = process.env.APP_NAME;

        const merge_info = {
            name,
            password_set_link: passwordSetLink,
            team: appName,
            product_name: appName,
            email
        };

        const subject = process.env.ZEPTO_MAIL_VERIFICATION_EMAIL_SUBJECT;

        await this.zeptoMailClient.sendMail(templateKey, email, merge_info, subject);
    }


}
