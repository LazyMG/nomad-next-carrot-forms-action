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
export interface Tweet {
  user: {
    username: string;
  };
  id: number;
  tweet: string;
  created_at: Date;
  updated_at: Date;
  userId: number;
}
