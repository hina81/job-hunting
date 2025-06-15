import { prisma } from "@/app/api/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

async function main() {
  try {
    // Prisma Clientの初期化
    await prisma.$connect();
  } catch (error) {
    return Error("DB接続に失敗しました");
  }
}

export const GET = async (req: Request) => {
  try {
    await main();
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "認証されていません" },
        { status: 401 }
      );
    }
    const userId = session.user.id;
    const companies = await prisma.company.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        progresses: true,
      },
    });
    if (!companies || companies.length === 0) {
      return NextResponse.json(
        { message: "success", data: [] },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "success", data: companies },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request) => {
  try {
    await main();
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "認証されていません" },
        { status: 401 }
      );
    }
    const userId = session.user.id;
    const { name, url, notes } = {
      name: "Test Company",
      url: "https://example.com",
      notes: null,
    };
    //後でuser情報を取得する処理を追加する

    const company = await prisma.company.create({
      data: {
        name,
        url,
        notes,
        userId,
      },
    });
    return NextResponse.json(
      { message: "success", data: company },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
