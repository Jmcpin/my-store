export interface User {
  id: number,
  email: string,
  name: string,
  password: string,
  role: 'customer' | 'admin',
}

/*export interface createUser extends Omit <User, 'id'>{

}*/
//An interface declaring no members is equivalent to its supertype.eslint@typescript-eslint/no-empty-interface

export interface createUser {
  email: string,
  name: string,
  password: string,
  role: 'customer' | 'admin',
}
