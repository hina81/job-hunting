import { prisma } from "@/app/api/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UpdateCompanyDTO } from "@/types/dtos";

export async function GET(req: Request, context: any) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    const { companyId } = await context.params;
    const companyDetailData = await prisma.company.findUnique({
      where: {
        id: companyId,
        userId: session.user.id,
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

export async function PUT(request: Request, context: any) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }
    const { companyId } = await context.params;
    const body = await request.json();

    const updateData: UpdateCompanyDTO = {
      ...(body.name && { name: body.name }),
      ...(body.url && { url: body.url }),
      ...(body.status && { status: body.status }),
      ...(body.notes && { notes: body.notes }),
      updatedAt: new Date(),
    };

    const updateCompany = await prisma.company.update({
      where: {
        id: companyId,
        userId: session.user.id,
      },
      data: updateData,
    });
    return NextResponse.json({
      status: "success",
      data: updateCompany,
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
