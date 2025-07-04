import { headers } from "next/headers";

export async function getCompanies() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/companies`;
    const header = await headers();

    const response = await fetch(apiUrl, {
      method: "GET",
      cache: "no-store",
      headers: {
        cookie: header.get("cookie") || "",
      },
    });
    if (!response.ok) {
      throw new Error(`APIエラー: ${response.status}`);
    }
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
}
