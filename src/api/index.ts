import { AuthApiService } from "./Auth/AuthApiService";
import { CollectionsApiService } from "./Collections/CollectionsApiService";
import { ConsultantApiService } from "./Consultant/ConsultantApiService";
import { WebinarsApiService } from "./Webinars/WebinarsApiService";

export const authApi = new AuthApiService();
export const collectionsApi = new CollectionsApiService();
export const webinarsApi = new WebinarsApiService();
export const consultantApi = new ConsultantApiService();
