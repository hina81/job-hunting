"use client";
import { authClient } from "@/lib/auth-client";

export default function Login() {
  const handleSignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      errorCallbackURL: "/",
    });
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md p-8 px-12 mt-16 bg-white shadow-md rounded-[8px]">
        <h1 className="text-2xl font-semibold text-center mb-4">ログイン</h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          ようこそ！ログインして始めましょう。
        </p>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleSignInWithGoogle}
            className="w-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 px-3 py-2 rounded-[8px] transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            {/* <img src={githubIcon} alt="GitHub Icon" className="w-6 h-6" />{" "} */}
            <span className="text-sm text-gray-700 font-medium">
              Googleでログイン
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
