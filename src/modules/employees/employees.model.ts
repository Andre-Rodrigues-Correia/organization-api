import mongoose from 'mongoose';

export interface Employee {
  name: string;
  email: string;
  position: string;
  status: string;
  terminatedAt?: Date | null;
  password: string;
  organization: mongoose.Types.ObjectId;
}
