import { AutoSurvey, Organization } from "@/pages/type/type";
import { Dispatch, SetStateAction, createContext } from "react";
import { initSurvey } from "./initializer";

export interface OrgContextValue {

    organization: Organization;
    setOrganization: Dispatch<SetStateAction<Organization>>;  

    survey: AutoSurvey;
    setSurvey: Dispatch<SetStateAction<AutoSurvey>>; 

    setSurveys: Dispatch<SetStateAction<AutoSurvey[]>>; 

    signUpStatus: boolean;

    setSignUpStatus: Dispatch<SetStateAction<boolean>>; 

}

export const OrgContext = createContext<OrgContextValue> ({

    organization: {orgId: '', orgName: '', surveys: []},
    setOrganization: () => {},
    survey: initSurvey,
    setSurvey: () => {},
    setSurveys: () => {},
    signUpStatus: false,
    setSignUpStatus: () => {}
});