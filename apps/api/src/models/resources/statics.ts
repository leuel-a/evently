import { IResourceModel, ResourceDocument } from './schema';
import {getResourcesProjection} from './utils';

export type GetResourcesResult = ResourceDocument[]

export async function getResources(this: IResourceModel) {
    const projection = getResourcesProjection();
    return this.find({}, projection);
}
