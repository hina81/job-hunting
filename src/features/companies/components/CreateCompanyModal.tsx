import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useCreateCompanyMutation } from "../hooks/useCreateCompanyMutation";

const CreateCompanyForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { createCompany } = useCreateCompanyMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName.trim()) {
      setError("企業名を入力してください");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await createCompany(companyName.trim());
      setCompanyName("");
      setOpen(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "企業の作成に失敗しました";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-between mt-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="inline-flex items-center ml-3 px-3 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          + 新規追加
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              選考状況を追加する
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-sm text-gray-500">
            会社名を入力してください。
          </DialogDescription>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="companyName"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                会社名
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                disabled={isLoading}
                className="px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !companyName.trim()}
                className="px-4 py-2 text-sm bg-cyan-500 text-white hover:bg-cyan-600 
                rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed 
                flex items-center gap-2"
              >
                {isLoading ? "追加中..." : "会社を追加"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCompanyForm;
