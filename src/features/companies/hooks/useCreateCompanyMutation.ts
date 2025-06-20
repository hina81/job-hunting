import { CreateCompanyDTO } from "@/types/dtos";
import { Company } from "@/types/types";

export const useCreateCompanyMutation = () => {
  const createCompany = async (
    name: Company["name"],
    createdAt: Date = new Date()
  ): Promise<void> => {
    try {
      const createData: CreateCompanyDTO = {
        name,
        createdAt,
      };
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const apiUrl = `${baseUrl}/api/companies`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createData),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`APIエラー: ${error.message || response.status}`);
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("企業の作成に失敗しました：", error);
      throw error;
    }
  };
  return { createCompany };
};
