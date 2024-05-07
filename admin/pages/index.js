import Layout from "@/components/Layout";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  console.log({ session });
  if (!session) {
    return (
      <div className="bg-gray-200 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <Layout>
      <div className="text-gray-900 flex justify-between">
        <h2>
          Hello, <b> {session?.user?.name}</b>
        </h2>

        <div className=" flex bg-grey-300 gap-1 text-black rounded-lg overflow-hidden">
          <img src={session?.user?.image} className="w-6 h-6" />

          <span className="px-2"> {session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
