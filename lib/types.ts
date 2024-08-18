export interface TweetResponse {
  id: number;
  payload: string;
  created_at: Date;
  updated_at: Date;
  userId: number;
  tweetId: number;
  user: {
    username: string;
  };
}
