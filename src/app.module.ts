import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TweetsModule } from './tweets/tweets.module';

@Module({
  imports: [ConfigModule.forRoot(), TweetsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
