import { AuthApiService } from "./Auth/AuthApiService";
import { CollectionsApiService } from "./Collections/CollectionsApiService";

export const authApi = new AuthApiService();
export const collectionsApi = new CollectionsApiService();
