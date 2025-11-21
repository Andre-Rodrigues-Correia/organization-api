import mongoose from 'mongoose';
import { CallbackError } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Employee } from '@/modules/employees/employees.model';

const EmployeesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    status: { type: String, default: 'active' },
    terminatedAt: { type: Date, default: null },
    password: { type: String, required: true, select: false },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
  },
  { timestamps: true },
);

EmployeesSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    this['password'] = await bcrypt.hash(this['password'], 10);
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

EmployeesSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as Partial<Employee>;
  if (update?.password) {
    const hashed = await bcrypt.hash(update.password, 10);
    this.setUpdate({ ...update, password: hashed });
  }
  next();
});

export default mongoose.model('Employee', EmployeesSchema);
