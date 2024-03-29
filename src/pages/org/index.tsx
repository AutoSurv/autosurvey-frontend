
import {  useContext, useEffect } from "react";
import { getOrganizations } from "../../helper/apiService";
import OrgContent from "@/component/organizations/OrgContent";
import { OrgContext } from "@/helper/context";
import { initOrg } from "@/helper/initializer";

export default function Orgs() {
    const { setOrganizations, setFilterYears, setFilterCountries, setFilterLocations, setOrganization } = useContext(OrgContext);

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