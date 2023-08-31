
import {  useContext, useEffect, useMemo, useState } from "react";
import { getOrganizations } from "../../helper/apiService";
import { Organization } from "../../type/type";
import OrgContent from "@/component/organizations/OrgContent";
import { OrgContext } from "@/helper/context";
import { initOrg } from "@/helper/initializer";

export default function Orgs() {
    const { organizations, setOrganizations, setFilterYears, setFilterCountries, setFilterLocations, setOrganization } = useContext(OrgContext);
    //const [organizations, setOrganizations] = useState<Organization[]>([]);

    useEffect(() => {
        setOrganization(initOrg);
        setFilterCountries([]);
        setFilterLocations([]);
        setFilterYears([]);
        getOrganizations(setOrganizations);
    }, [])

    return (
        <main className="org-main">
            <div className="org-content-container">
              <OrgContent />
             
            </div>
        </main>

    )

}