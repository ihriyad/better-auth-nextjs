import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const DashBoardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div>
      <h2>This is dashboard Page</h2>
    </div>
  );
};

export default DashBoardPage;
