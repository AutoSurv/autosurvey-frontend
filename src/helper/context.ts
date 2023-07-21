import { AutoSurvey, Organization } from "@/type/type";
import { Dispatch, SetStateAction, createContext } from "react";
import { initSurvey } from "./initializer";

export interface OrgContextValue {

    organization: Organization;
    setOrganization: Dispatch<SetStateAction<Organization>>;  

    survey: AutoSurvey;
    setSurvey: Dispatch<SetStateAction<AutoSurvey>>; 
    setSurveys: Dispatch<SetStateAction<AutoSurvey[]>>; 

    userNameAuth: string;
    setUserNameAuth: Dispatch<SetStateAction<string>>;    

    signUpStatus: boolean;
    setSignUpStatus: Dispatch<SetStateAction<boolean>>; 

    filterLocation: string[];
    setFilterLocation: Dispatch<SetStateAction<string[]>>; 


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
    filterLocation: [],
    setFilterLocation: () => {},

});