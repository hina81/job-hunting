import { CompanyDetailView } from "@/features/companies/layout/CompanyDetailView";
import { getCompanyById } from "@/features/companies/hooks/useCompanyById";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Header from "@/features/navigation/components/Header";
import RequireLogin from "@/components/RequireLogin";

type PageProps = {
  params: Promise<{ companyId: string }>;
};

export default async function CompanyDetailPage({ params }: PageProps) {
  const { companyId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return <RequireLogin />;
  }
  const companyDetail = await getCompanyById(companyId);
  return (
    <>
      <Header />
      <CompanyDetailView company={companyDetail} />
    </>
  );
}
