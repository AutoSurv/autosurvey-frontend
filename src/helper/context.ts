import { AutoSurvey, Organization } from "@/pages/type/type";
import { Dispatch, SetStateAction, createContext } from "react";
import { initSurvey } from "./initializer";

export interface OrgContextValue {

    organization: Organization;
    setOrganization: Dispatch<SetStateAction<Organization>>;  

    survey: AutoSurvey;
    setSurvey: Dispatch<SetStateAction<AutoSurvey>>; 

    setSurveys: Dispatch<SetStateAction<AutoSurvey[]>>; 

    isUserAuthenticated: boolean;
    setIsUserAuthenticated: Dispatch<SetStateAction<boolean>>;

    userNameAuth: string;
    setUserNameAuth: Dispatch<SetStateAction<string>>;
}

export const OrgContext = createContext<OrgContextValue> ({

    organization: {orgId: '', orgName: '', surveys: []},
    setOrganization: () => {},
    survey: initSurvey,
    setSurvey: () => {},
    setSurveys: () => {},
    isUserAuthenticated: false,
    setIsUserAuthenticated: () => {},
    userNameAuth: "",
    setUserNameAuth: () => {},
});