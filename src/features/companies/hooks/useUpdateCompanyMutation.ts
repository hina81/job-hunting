import { UpdateCompanyDTO } from "@/types/dtos";
import { Company } from "@/types/types";

export const useUpdateCompanyMutation = () => {
  const updateCompanyTitle = async (
    companyId: Company["id"],
    title: Company["name"],
    updatedAt: Date = new Date()
  ): Promise<void> => {
    try {
      const updateData: UpdateCompanyDTO = {
        name: title,
        updatedAt: updatedAt,
      };
      const response = await fetch(`/api/companies/${companyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`APIエラー: ${error.message || response.status}`);
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("企業名の更新に失敗しました：", error);
      throw error;
    }
  };

  return { updateCompanyTitle };
};
