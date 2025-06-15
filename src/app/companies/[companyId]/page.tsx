import { CompanyDetailView } from "@/features/companies/layout/CompanyDetailView";
import { getCompany } from "@/features/companies/hooks/useCompanies";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Header from "@/features/navigation/components/Header";

export default async function CompanyDetailPage({
  params,
}: {
  params: { companyId: string };
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return <div>ログインが必要です。</div>;
  }
  const companyDetail = await getCompany(params.companyId);
  return (
    <>
      <Header />
      <CompanyDetailView company={companyDetail} />
    </>
  );
}
