export interface user {
  id: number,
  email: string,
  name: string,
  password: string,
}

export interface createUser extends Omit <user, 'id'>{

}
