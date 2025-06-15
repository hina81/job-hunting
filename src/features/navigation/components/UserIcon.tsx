"use client";

import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
const UserIcon = () => {
  const { data, isPending } = authClient.useSession();
  const session = data;
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      errorCallbackURL: "/",
    });
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
    setOpen(false);
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button className="rounded-lg p-2 text-gray-500  hover:text-gray-700 transition-colors duration-200 ">
            <CircleUserRound />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuGroup>
            {session ? (
              <>
                <DropdownMenuItem onClick={() => {}}>設定</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  サインアウト
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={handleSignInWithGoogle}>
                ログイン
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserIcon;
