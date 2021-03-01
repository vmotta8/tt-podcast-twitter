import { HttpModule, Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';

@Module({
  providers: [TweetsService],
  controllers: [TweetsController],
  imports: [HttpModule],
})
export class TweetsModule {}
