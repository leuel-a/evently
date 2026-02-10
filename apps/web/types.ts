export enum EVENT_STATUS {
    DRAFT = 'draft',
    ACTIVE = 'active',
    CLOSED = 'closed',
}

export enum EVENT_TYPE {
    PHYSICAL = 'physical',
    VIRTUAL = 'virtual',
    HYBRID = 'hybrid',
}

export interface IEvent {
    title: string;
    description: string;
    date: Date;
    location?: string;
    price: number;
    capacity: number;
    category: IEventCategory;
    checkoutLink?: string;
    status: EVENT_STATUS;
    type: EVENT_TYPE;
    createdAt: Date;
    updatedAt: Date;
    virtualUrl?: string;
    startTime: string;
    endTime: string;
    isVirtual: boolean;
    isFree: boolean;
    address: string;
}

export type IApiResponse<T = any> = {
    data: T,
}

export type EventApiResponse = {
    data: IEvent[];
    page: number;
    limit: number;
};

export type SettingsApiResponse = {
    category: {
        all: {id: string; name: string}[];
        active: {id: string; name: string}[];
    };
};
export interface IEventCategory {
    name: string;
    description: string;
}
