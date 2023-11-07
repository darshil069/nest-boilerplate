// That code have type-checking and defining the types of data that can be passed to a controller or a Nest service.
export interface BaseModel {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDetails {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  phone_no: string;
  role: string;
  password: string;
}
