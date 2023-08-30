import { Survey, Organization, Pagination } from "@/type/type";
import { Dispatch, SetStateAction, createContext } from "react";
import { initPagination, initSurvey } from "./initializer";

export interface OrgContextValue {

    organization: Organization;
    setOrganization: Dispatch<SetStateAction<Organization>>;  
   
    setOrganizations: Dispatch<SetStateAction<Organization[]>>;  

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

    isFilterSet: boolean;
    setIsFilterSet: Dispatch<SetStateAction<boolean>>; 

    pagination: Pagination;
    setPagination: Dispatch<SetStateAction<Pagination>>;
}

export const OrgContext = createContext<OrgContextValue> ({

    organization: {orgId: '', orgName: '', surveys: [], users: []},
    setOrganization: () => {},
    
    setOrganizations: () => {},
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
    isFilterSet: false,
    setIsFilterSet: () => {},
    pagination: initPagination,
    setPagination: () => {}

});