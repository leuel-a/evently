import mongoose from 'mongoose';
import {modelNames} from '../../config';

export interface ICheckoutConfigCustomField {
    label: string; // "T-shirt size"
    fieldType: 'text' | 'select' | 'checkbox' | 'number';
    options?: string[]; // for select fields
    isRequired: boolean;
    order: number;
}

export interface ICheckoutConfig {
    event: mongoose.Types.ObjectId; // TODO: check if this needs to be a string

    /** Unique URL for the Checkout Page */
    slug: string; // unique URL slug

    /** This is for the layout but needs to have additional fields */
    branding: {
        primaryColor: string;
        logoUrl: string;
        bannerUrl: string;
        thankYouMessage: string;
    };

    customFields: Array<ICheckoutConfigCustomField>;

    isActive: boolean;
}

const schema = new mongoose.Schema<ICheckoutConfig>(
    {
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: modelNames.events,
            required: true,
        },

        slug: {
            type: String,
            required: true,
        },

        branding: {
            primaryColor: {type: String},
            logoUrl: {type: String},
            bannerUrl: {type: String},
            thankYouMessage: {type: String},
        },
    },
    {timestamps: true},
);

export default schema;
