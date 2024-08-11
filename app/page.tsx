import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-screen-sm mx-auto my-28">
      <div className="flex flex-col gap-10 py-8 px-6">
        <div className="flex justify-center items-center">
          <span className="text-6xl">Welcome!</span>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            href="/log-in"
            className="text-lg bg-gray-100 rounded-2xl h-12 hover:bg-gray-200 flex items-center justify-center"
          >
            Log in
          </Link>
          <Link
            href="/create-account"
            className="text-lg bg-gray-100 rounded-2xl h-12 hover:bg-gray-200 flex items-center justify-center"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
