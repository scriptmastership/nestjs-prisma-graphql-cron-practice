import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ProjectCron {

  constructor(
    @InjectQueue('project') private queue: Queue
  ) { }

  @Cron('0 * * * * *')
  async handleCron() {
    await this.queue.add('run');
  }
}
