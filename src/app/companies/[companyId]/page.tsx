import { CompanyDetailView } from "@/features/companies/layout/CompanyDetailView";
import { getCompany } from "@/features/companies/hooks/useCompanies";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Header from "@/features/navigation/components/Header";

type PageProps = {
  params: Promise<{ companyId: string }>;
};

export default async function CompanyDetailPage({ params }: PageProps) {
  const { companyId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return <div>ログインが必要です。</div>;
  }
  const companyDetail = await getCompany(companyId);
  return (
    <>
      <Header />
      <CompanyDetailView company={companyDetail} />
    </>
  );
}
