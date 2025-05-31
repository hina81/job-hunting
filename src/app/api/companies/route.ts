import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function main() {
    try {
        // Prisma Clientの初期化
        await prisma.$connect();
    }catch(error) {
        return Error("DB接続に失敗しました")
    }
}

export const GET = async (req:Request, res:NextResponse) => {
    try {
        await main();

        //後でuser情報を取得する処理を追加する
        const userId = "1"
        const companies = await prisma.company.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json({message: "success",data: companies},{status: 200})
    }catch (error) {
        console.error("Error:",error)
        return NextResponse.json({error: "サーバーエラーが発生しました"},{status: 500})
    }finally {
        await prisma.$disconnect();
    }
}