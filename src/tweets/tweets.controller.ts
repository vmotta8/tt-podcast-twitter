import { Controller } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  EventPattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { Group } from './dtos/group';
import { TweetsService } from './tweets.service';

@Controller('tweets')
export class TweetsController {
  private clientProxy: ClientProxy;

  constructor(private tweetsService: TweetsService) {
    this.clientProxy = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL],
        queue: 'podcast_queue',
      },
    });
  }

  @EventPattern('get-tweets')
  async getTweets(@Payload() data: Group[]): Promise<boolean> {
    const tweets = await this.tweetsService.getTweets(data);
    this.clientProxy.emit('get-podcasts', tweets);
    return true;
  }
}
