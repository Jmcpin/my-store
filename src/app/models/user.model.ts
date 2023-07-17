export interface User {
  id: number,
  email: string,
  name: string,
  password: string,
  role: 'customer' | 'admin',
}

export interface createUser extends Omit <User, 'id'>{

}
