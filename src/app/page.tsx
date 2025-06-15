import { getCompaniesList } from "@/features/companies/hooks/useCompanies";
import ViewContainer from "@/features/companies/layout/ViewContainer";

import { auth } from "@/lib/auth"; // better-auth のインスタンス
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return <div>ログインが必要です。</div>;
  }

  const companies = await getCompaniesList();
  return (
    <main className="min-h-screen bg-gray-50">
      <ViewContainer companies={companies} />
    </main>
  );
}
