import mongoose from 'mongoose';

const OrganizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sector: { type: String, required: true },
    cnpj: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true },
);

export default mongoose.model('Organization', OrganizationSchema);
