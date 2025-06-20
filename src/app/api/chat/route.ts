import { NextRequest } from "next/server";
import { google } from "@ai-sdk/google";
import { CoreMessage, streamText } from "ai";
import { experimental_createMCPClient as createMcpClient } from "ai";

export async function GET(request: NextRequest) {
  const mcpClient = await createMcpClient({
    transport: {
      type: "sse",
      url : "http://localhost:3010/sse"
    }
  })
  // const {messages} = await request.json()

    const fixedMessage:CoreMessage[] = [
    {
      role: "system",
      content: "以下のメール一覧から就活に関連する会社情報を抽出してください。",
    },
    {
      role: "user",
      content: "メール一覧:\n1. 件名: 面接日程のご案内 - 株式会社ABC\n2. 件名: 内定通知 - 株式会社XYZ\n...",
    },
  ];

  const tools = await mcpClient.tools()

  const result = streamText({
    model: google("gemini-2.0-flash-lite"),
    messages:fixedMessage,
    tools,
    onFinish: () => {
      mcpClient.close()
    }
  })
  return result.toDataStreamResponse()
}