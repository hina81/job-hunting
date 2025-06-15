export type ViewType = "table" | "calendar";

export type ViewOption = {
  name: string;
  type: ViewType;
  icon: React.ReactNode;
};

export type Company = {
  id: string;
  name: string;
  url?: string;
  notes?: string;
  status?: string;
  userId: string;
  user: User;
  progresses: Progress[];
};

export type Progress = {
  id: string;
  task: string;
  deadline?: any;
  companyId: string;
  company: Company;
};

export type EmailLog = {
  id: string;
  userId: string;
  user: User;
  body?: string;
  receivedAt?: string;
};

export type User = {
  id: string;
  email: string;
  name?: string;
  image?: string;
  emailLogs: EmailLog[];
  companies: Company[];
  emailVerified: boolean;
};
