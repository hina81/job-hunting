import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    const tokenResult = await auth.api.getAccessToken({
      body: {
        providerId: "google",
        userId: session.user.id,
      },
      headers: await headers(),
    });

    if (!tokenResult?.accessToken) {
      return NextResponse.json(
        { error: "Googleアカウントが連携されていません" },
        { status: 400 }
      );
    }

    const { event } = await request.json();

    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenResult.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      if (response.status === 401) {
        return NextResponse.json(
          { error: "Googleアカウントの認証が必要です" },
          { status: 401 }
        );
      }

      throw new Error(`Google Calendar API Error: ${errorData.error?.message}`);
    }

    const createdEvent = await response.json();

    return NextResponse.json({
      status: "success",
      data: createdEvent,
      message: "カレンダーイベントを作成しました",
    });
  } catch (error) {
    console.error("Calendar event creation error:", error);
    return NextResponse.json(
      { error: "イベントの作成に失敗しました" },
      { status: 500 }
    );
  }
}
