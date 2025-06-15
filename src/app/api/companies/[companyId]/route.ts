import { prisma } from "@/app/api/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(req: Request, context: any) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    const { companyId } = context.params;
    const companyDetailData = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
      include: {
        progresses: {
          orderBy: { deadline: "asc" },
        },
      },
    });

    if (!companyDetailData) {
      return NextResponse.json(
        { error: "企業が見つかりません" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      data: companyDetailData,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
