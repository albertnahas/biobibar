export interface Contact {
  id?: string,
  name: string,
  phone: string,
  email: string,
  source?: string
  read?: boolean,
  createdAt?: Date,
}