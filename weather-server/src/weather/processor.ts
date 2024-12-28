import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('schedule-queue')
export class ScheduleConsumer extends WorkerHost {
  async process(job: Job<any, any, string>): Promise<any> {
    console.log(job.name, job.data, job.progress)
    await new Promise(res => setTimeout(res, 10000))
    console.log('end')
  }
}