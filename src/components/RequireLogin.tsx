export default function RequireLogin() {
  return (
    <div className="flex flex-col items-center justify-center py-30">
      <p className="mb-4 text-gray-700 text-lg">ログインが必要です。</p>
      <a
        href="/login"
        className="inline-flex items-center px-15 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-md"
      >
        ログイン画面はこちら
      </a>
    </div>
  );
}
