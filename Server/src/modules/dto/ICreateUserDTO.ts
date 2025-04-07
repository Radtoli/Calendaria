export interface ICreateUserDTO {
  prd_number: number;
  email: string;
  password: string;
  prd_name: string;
  prd_adress_street: string;
  prd_adress_number: string;
  prd_adress_city: string;
  prd_adress_state: string;
  prd_adress_zip_code: string;
  is_admin: boolean;
}
