import {IResourceModel, ResourceDocument} from './schema';

export type GetResourcesResult = ResourceDocument[];

export async function getResources(this: IResourceModel) {
    return this.find({}, {_id: 0, id: '$_id', name: 1});
}
