
import { useContext, useEffect, useMemo } from "react";
import OrgContent from "@/component/organizations/OrgContent";
import { OrgContext } from "@/helper/context";
import { initOrg } from "@/helper/initializer";
import { getOrganizations } from "@/helper/apiService";

export default function Orgs() {
    const { setFilterYears, setOrganizations, setFilterCountries, setFilterLocations, setOrganization } = useContext(OrgContext);

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