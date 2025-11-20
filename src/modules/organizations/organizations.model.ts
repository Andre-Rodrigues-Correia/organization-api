export interface Organization {
  name: string;
  sector: string;
  cnpj: string;
  city: string;
  is_active?: boolean;
  deleted_at?: Date | null;
}
