import { Organization } from "@/pages/type/type";
import { Dispatch, SetStateAction, createContext } from "react";

export interface OrgContextValue {

    organization: Organization;
    setOrganization: Dispatch<SetStateAction<Organization>>;  

}

export const OrgContext = createContext<OrgContextValue> ({

    organization: {orgId: '', orgName: '', surveys: []},
    setOrganization: () => {}
    
});