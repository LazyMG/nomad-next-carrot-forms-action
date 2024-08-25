import Tweet from "@/components/tweet";
import db from "@/lib/db";
import getSession from "@/lib/session";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      include: {
        tweets: {
          select: {
            id: true,
            tweet: true,
            created_at: true,
          },
          orderBy: {
            created_at: "desc",
          },
        },
      },
    });
    if (user) return user;
  }
  notFound();
}

const Profile = async () => {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div className="px-6 flex flex-col gap-5 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex justify-center items-center">
          <span className="text-6xl">Welcome {user?.username} 🔥</span>
        </div>
        <div className="flex flex-col gap-2 text-md">
          <span>Email: {user.email}</span>
          <span>
            CreatedAt:{" "}
            {user.created_at.toLocaleDateString() +
              " " +
              user.created_at.toLocaleTimeString()}
          </span>
          <span>Bio: {user?.bio.toString()}</span>
        </div>
      </div>
      <form action={logOut} className="flex w-full gap-3">
        <button className="w-1/2 text-lg bg-neutral-100  rounded-2xl h-12 shadow-md hover:bg-green-200">
          Log out
        </button>
        <Link className="w-1/2" href={`/users/${user.id}/edit`}>
          <button className="w-full text-lg bg-neutral-100  rounded-2xl h-12 shadow-md hover:bg-green-200">
            Edit
          </button>
        </Link>
      </form>
      <div className="h-0.5 bg-neutral-100" />
      <div className="flex flex-col gap-4">
        {user.tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetDate={tweet.created_at}
            tweet={tweet.tweet}
            tweetId={tweet.id}
            tweetUser={user.username}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
