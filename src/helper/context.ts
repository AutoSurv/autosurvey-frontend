import { Organization } from "@/pages/type/type";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export interface MyContextValue {
    organization: Organization
}

export const Org_data = createContext<MyContextValue>({

    organization: {
        orgId: "",
        orgName: "",
        surveys: []
    }

})

function Context({ children }) {

    const [organization, setOrganization] = useState<Organization>({
        orgId: "",
        orgName: "",
        surveys: []
    });

    return (
        <Org_data.Provider value={{ organization, setOrganization}}>
        {children}
        </Org_data.Provider>
    )

}