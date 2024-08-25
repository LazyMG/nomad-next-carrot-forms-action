import EditForm from "@/components/edit-form";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";

async function getUserData(id: number) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });
  return user;
}

const getCachedUserData = nextCache(getUserData, ["user-data"], {
  tags: ["user-data"],
  revalidate: 60,
});

const UserEdit = async ({ params }: { params: { username: string } }) => {
  const userId = Number(params.username);
  if (isNaN(userId)) notFound();
  const session = await getSession();
  if (session?.id !== userId) redirect("/");
  const user = await getCachedUserData(userId);
  if (!user) notFound();
  return (
    <div className="flex flex-col gap-5 pt-5 pb-8 px-6">
      <div className="text-2xl font-semibold">
        {user.username}&apos;s Edit page
      </div>
      <EditForm user={user!} />
    </div>
  );
};

export default UserEdit;
