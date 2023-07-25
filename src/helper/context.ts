import { Survey, Organization } from "@/type/type";
import { Dispatch, SetStateAction, createContext } from "react";
import { initSurvey } from "./initializer";

export interface OrgContextValue {

    organization: Organization;
    setOrganization: Dispatch<SetStateAction<Organization>>;  

    survey: Survey;
    setSurvey: Dispatch<SetStateAction<Survey>>; 
    setSurveys: Dispatch<SetStateAction<Survey[]>>; 

    userNameAuth: string;
    setUserNameAuth: Dispatch<SetStateAction<string>>;    

    signUpStatus: boolean;
    setSignUpStatus: Dispatch<SetStateAction<boolean>>; 

    filterLocations: string[];
    setFilterLocations: Dispatch<SetStateAction<string[]>>; 


}

export const OrgContext = createContext<OrgContextValue> ({

    organization: {orgId: '', orgName: '', surveys: []},
    setOrganization: () => {},
    survey: initSurvey,
    setSurvey: () => {},
    setSurveys: () => {},
    userNameAuth: "",
    setUserNameAuth: () => {},
    signUpStatus: false,
    setSignUpStatus: () => {},
    filterLocations: [],
    setFilterLocations: () => {},

});