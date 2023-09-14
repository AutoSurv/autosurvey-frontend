import { Survey, Organization, Pagination, UserDto, ClickedCountry } from "@/type/type";
import { Dispatch, SetStateAction, createContext } from "react";
import { initClickedCountry, initPagination, initSurvey, initUserDto } from "./initializer";

export interface OrgContextValue {

    organization: Organization;
    setOrganization: Dispatch<SetStateAction<Organization>>;  
   
    organizations: Organization[];
    setOrganizations: Dispatch<SetStateAction<Organization[]>>;  

    survey: Survey;
    setSurvey: Dispatch<SetStateAction<Survey>>; 

    surveys: Survey[]
    setSurveys: Dispatch<SetStateAction<Survey[]>>; 

    userNameAuth: string;
    setUserNameAuth: Dispatch<SetStateAction<string>>;    

    userDto: UserDto;
    setUserDto: Dispatch<SetStateAction<UserDto>>;    

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

    clickedCountry: ClickedCountry;
    setClickedCountry: Dispatch<SetStateAction<ClickedCountry>>;

    clickedCountries: ClickedCountry[];
    setClickedCountries: Dispatch<SetStateAction<ClickedCountry[]>>;
}

export const OrgContext = createContext<OrgContextValue> ({

    organization: {orgId: '', orgName: '', surveysIds: [], usersIds: []},
    setOrganization: () => {},
    organizations: [],
    setOrganizations: () => {},
    survey: initSurvey,
    setSurvey: () => {},
    surveys: [],
    setSurveys: () => {},
    userNameAuth: "",
    setUserNameAuth: () => {},
    userDto: initUserDto,
    setUserDto: () => {},
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
    setPagination: () => {},
    clickedCountry: initClickedCountry,
    setClickedCountry: () => {},
    clickedCountries: [],
    setClickedCountries: () => {},

});