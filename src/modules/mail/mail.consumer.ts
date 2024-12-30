import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ZeptoMailClient } from './zepto-mail-client';
import { EmailJobName } from './enums/email-job-name.enum';
import { QueueName } from 'src/common/enums/queue-name.enum';

@Processor(QueueName.MAIL)
export class MailConsumer extends WorkerHost {
    private readonly logger = new Logger(MailConsumer.name);

    constructor(private readonly zeptoMailClient: ZeptoMailClient) {
        super();
    }

    async process(job: Job<any, any, string>): Promise<any> {
        const { recipient, name } = job.data;
        switch (job.name) {
            case EmailJobName.OTP:
                await this.sendOTP(recipient, job.data.otpValue, name);
                break;
            case EmailJobName.VERIFICATION_LINK:
                await this.sendVerificationLink(recipient, job.data.verificationLink, name);
                break;
            default:
                this.logger.log(`Email successfully dispatched to: ${recipient}`);
                break;
        }

        return {};
    }

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
