import { TweetsService } from './tweets.service';

describe('tweets service', () => {
  const tweetsService = new TweetsService();
  it('should return empty data if user is invalid', async () => {
    const groups = [
      {
        id: 'string',
        name: 'string',
        users: ['a1a1a1a1a1a1a1a1a1a1a1a1'],
        userId: 'string',
        email: 'string',
      },
    ];
    const tweets = await tweetsService.getTweets(groups);

    expect(tweets[0].data).toEqual([]);
  });
});
