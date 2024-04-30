interface Page {
  total: number;
  current: number;
  size: number;
}

interface User {
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

export interface FullDataUser extends User, Data {}

export interface ApiResponse {
  page: Page;
  users: User[];
  data: Data[];
}
