export type UpdateCompanyDTO = {
  name?: string;
  url?: string;
  status?: string;
  notes?: string;
  updatedAt: Date;
};

export type CreateCompanyDTO = {
  name: string;
  url?: string;
  notes?: string;
  status?: string;
  createdAt: Date;
};
