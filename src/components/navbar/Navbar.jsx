"use client";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data, isPending } = useSession();
  if (isPending) {
    return <div>Loading...</div>;
  }
  const user = data?.user;

  return (
    <div>
      <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
        <header className="flex h-16 items-center justify-between px-6">
          <div>
            <Link href={"/"}>
              <h2 className="text-2xl font-bold">Better Auth</h2>
            </Link>
          </div>
          <div className="space-x-3">
            <Link href={"/about"}>About</Link>
            <Link href={"/dashboard"}>DashBoard</Link>
          </div>
          <div>
            <ul className="flex items-center gap-4">
              <li>
                {user ? (
                  <></>
                ) : (
                  <>
                    <Link href={"/auth/signin"}>
                      <Button variant="primary">Log In</Button>
                    </Link>
                  </>
                )}
              </li>
              <li>
                {user ? (
                  <>
                    <p className="font-bold">Welcome,{user.name}</p>
                    <p
                      className="underline text-red-500 cursor-pointer"
                      onClick={() => signOut()}
                    >
                      Log out
                    </p>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signup">
                      <Button variant="secondary">Sign Up</Button>
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </div>
        </header>
      </nav>
    </div>
  );
};

export default Navbar;
