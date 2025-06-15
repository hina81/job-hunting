import { prisma } from "@/app/api/prisma";
import { CompanyDetailView } from "@/features/companies/components/CompanyDetailView";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function CompanyDetailPage({
  params,
}: {
  params: { companyId: string };
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return notFound();
  }

  const company = await prisma.company.findUnique({
    where: {
      id: params.companyId,
      userId: session.user.id,
    },
    include: {
      progresses: {
        orderBy: { date: "desc" },
        take: 1,
      },
    },
  });

  if (!company) {
    return notFound();
  }

  return <CompanyDetailView company={company} />;
}
