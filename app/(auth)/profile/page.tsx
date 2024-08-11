import FormButton from "@/components/form-button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
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
    <div className="max-w-screen-sm mx-auto my-28">
      <div className="flex flex-col gap-10 py-8 px-6">
        <div className="flex justify-center items-center">
          <span className="text-6xl">Welcome {user?.username} 🔥</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-lg">
        <span>Email: {user.email}</span>
        <span>CreatedAt: {user.created_at.toLocaleDateString()}</span>
      </div>
      <form action={logOut} className="flex flex-col gap-3">
        <FormButton text="Log out" />
      </form>
    </div>
  );
};

export default Profile;
