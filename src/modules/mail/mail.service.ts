import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { EmailJobName } from './enums/email-job-name.enum';
import { QueueName } from 'src/common/enums/queue-name.enum';

@Injectable()
export class MailService {
    constructor(
        @InjectQueue(QueueName.MAIL) private mailQueue: Queue
    ) { }

    async sendOtpEmail(
        recipient: string,
        otpValue: string,
        name?: string
    ): Promise<void> {
        await this.mailQueue.add(
            EmailJobName.OTP,
            {
                recipient,
                otpValue,
                name
            }
        );
    }

    async sendVerificationLinkEmail(
        recipient: string,
        verificationLink: string,
        name?: string
    ): Promise<void> {
        await this.mailQueue.add(
            EmailJobName.VERIFICATION_LINK,
            {
                recipient,
                verificationLink,
                name
            }
        );
    }
}
