import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ZeptoMailClient } from './zepto-mail-client';
import { BullModule } from '@nestjs/bullmq';
import { QueueName } from 'src/common/enums/queue-name.enum';
import { MailConsumer } from './mail.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueName.MAIL,
    })
  ],
  providers: [MailService, ZeptoMailClient, MailConsumer],
  exports: [MailService]
})
export class MailModule { }
