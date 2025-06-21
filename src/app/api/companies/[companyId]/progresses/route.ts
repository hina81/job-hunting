import { prisma } from "@/app/api/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CreateProgressDTO } from "@/types/dtos";

export async function POST(req: Request, context: any) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    const { companyId } = await context.params;
    const body: CreateProgressDTO = await req.json();
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
        userId: session.user.id,
      },
    });

    if (!company) {
      return NextResponse.json(
        { error: "企業が見つかりません" },
        { status: 404 }
      );
    }

    const progress = await prisma.progress.create({
      data: {
        task: body.task,
        deadline: body.deadline ? new Date(body.deadline) : null,
        companyId: companyId,
      },
    });

    return NextResponse.json({
      status: "success",
      data: progress,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
