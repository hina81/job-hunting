import { CreateProgressDTO } from "@/types/dtos";
import { Progress } from "@/types/types";

export const useCreateProgressMutation = () => {
  const createProgress = async (
    companyId: Progress["companyId"],
    progressData: CreateProgressDTO
  ): Promise<void> => {
    try {
      const response = await fetch(`/api/companies/${companyId}/progresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(progressData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `APIエラー: ${response.status}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("進捗の作成に失敗しました：", error);
      throw error;
    }
  };

  return { createProgress };
};
