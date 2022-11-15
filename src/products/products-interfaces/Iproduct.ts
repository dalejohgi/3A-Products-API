import { Document } from 'mongoose';
export interface Iproduct extends Document {
  id?: string,
  name: string,
  price: number,
  owner?: string
}