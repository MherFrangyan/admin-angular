interface Page {
  total: number;
  current: number;
  size: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: number;
  create_at: number;
  update_at: number;
}

export interface Data {
  user_id: number;
  is_admin: boolean;
  is_ecp: boolean;
  status: string;
}

export interface ApiResponse {
  page: Page;
  users: User[];
  data: Data[];
}

export interface IFormData {
  login: string;
  phone: string;
  createDate: string;
  email: string;
  role: string;
  updateData: string;
  status: string;
}
