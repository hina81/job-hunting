import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { CoreMessage, generateText } from "ai";
import { experimental_createMCPClient as createMcpClient } from "ai";

export async function POST(request: NextRequest) {
  const mcpClient = await createMcpClient({
    transport: {
      type: "sse",
      url : "http://localhost:3001/sse"
    }
  })
    const fixedMessage:CoreMessage[] = [
    {
      role: "system",
      content: "あなたは就活関連のメールを解析するAIです。メール一覧から選考に関するメールを抽出してください。抽出したメールについて、会社名、要約したメールの文章、選考ステータスを含む形で、split関数で分割しやすい形式で返してください。いくつかメールを取得出来たら、選考に関係あるものを返してください。選考ステータスは次の面接に案内の場合は次に行うものを選考ステータスとしてください。完全に採用された時だけ合格としてください。"
    },
    {
      role: "user",
      content: "gmail_getMessagesをmax_Results=2で実行してください。"
    },
    {
      role: "assistant",
      content: "以下の形式で返します:\n会社名: [会社名]\n要約: [要約したメールの文章]\n選考ステータス: [選考ステータス]\n---"
    }
  ];

  try {
    const tools = await mcpClient.tools()
    const result = await generateText({
      model: google("gemini-1.5-flash"),
      tools,
      messages: fixedMessage,
      maxSteps: 5,
    })
    return NextResponse.json({generatedText:result.text}, { status: 200 });
  }catch(error) {
    console.error("Error during MCP request:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}