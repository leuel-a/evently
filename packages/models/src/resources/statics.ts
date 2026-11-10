import type { IResourceModel, ResourceDocument } from './types';

export type GetResourcesResult = ResourceDocument[];
export async function getResources(this: IResourceModel) {
    return this.find({}, { _id: 0, resourceId: '$_id', name: 1 });
}
