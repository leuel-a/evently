import mongoose from 'mongoose';

export interface IOrganizer {
  user: mongoose.Types.ObjectId;
  organizationName: string;
  organizationType: 'INDIVIDUAL' | 'COMPANY' | 'NON_PROFIT' | 'GOVERNMENT';
  businessLicense: string;
  taxId: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  verificationDocuments: Array<{
    type: string;
    url: string;
    verified: boolean;
  }>;
  eventTypes: Array<'CONFERENCE' | 'WORKSHOP' | 'SEMINAR' | 'CONCERT' | 'EXHIBITION' | 'OTHER'>;
  isActive: boolean;
}

export interface IOrganizersDocument extends IOrganizer, mongoose.Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrganizersModel extends mongoose.Model<IOrganizersDocument> {
  // Add static methods here if needed
}
