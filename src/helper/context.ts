import { Survey, Organization } from "@/type/type";
import { Dispatch, SetStateAction, createContext } from "react";
import { initSurvey } from "./initializer";

export interface OrgContextValue {

    organization: Organization;
    setOrganization: Dispatch<SetStateAction<Organization>>;  

    survey: Survey;
    setSurvey: Dispatch<SetStateAction<Survey>>; 

    surveys: Survey[]
    setSurveys: Dispatch<SetStateAction<Survey[]>>; 

    userNameAuth: string;
    setUserNameAuth: Dispatch<SetStateAction<string>>;    

    signUpStatus: boolean;
    setSignUpStatus: Dispatch<SetStateAction<boolean>>; 

    filterYears: string[];
    setFilterYears: Dispatch<SetStateAction<string[]>>; 

    filterCountries: string[];
    setFilterCountries: Dispatch<SetStateAction<string[]>>;

    filterLocations: string[];
    setFilterLocations: Dispatch<SetStateAction<string[]>>;

    filteredSurveys: Survey[];
    setFilteredSurveys: Dispatch<SetStateAction<Survey[]>>; 


}

export const OrgContext = createContext<OrgContextValue> ({

    organization: {orgId: '', orgName: '', surveys: []},
    setOrganization: () => {},
    survey: initSurvey,
    setSurvey: () => {},
    surveys: [],
    setSurveys: () => {},
    userNameAuth: "",
    setUserNameAuth: () => {},
    signUpStatus: false,
    setSignUpStatus: () => {},
    filterYears: [],
    setFilterYears: () => {},
    filterCountries: [],
    setFilterCountries: () => {},
    filterLocations: [],
    setFilterLocations: () => {},
    filteredSurveys: [],
    setFilteredSurveys: () => {},

});