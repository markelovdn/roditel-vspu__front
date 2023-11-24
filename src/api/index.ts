import { AuthApiService } from "./Auth/AuthApiService";
import { CollectionsApiService } from "./Collections/CollectionsApiService";
import { ConsultantApiService } from "./Consultant/ConsultantApiService";
import { ConsultationsApiService } from "./Consultations/ConsultationsApiService";
import { QuestionnairesApiService } from "./Questionnaires/QuestionnairesApiService";
import { WebinarsApiService } from "./Webinars/WebinarsApiService";

export const authApi = new AuthApiService();
export const collectionsApi = new CollectionsApiService();
export const webinarsApi = new WebinarsApiService();
export const questionnairesApi = new QuestionnairesApiService();
export const consultantApi = new ConsultantApiService();
export const consultationsApi = new ConsultationsApiService();
