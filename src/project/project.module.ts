import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ProjectResolver } from './project.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectCron } from './project.cron';
import { ProjectQueue } from './project.queue';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'project',
    }),
  ],
  providers: [ProjectResolver, PrismaService, ProjectCron, ProjectQueue]
})
export class ProjectModule { }
