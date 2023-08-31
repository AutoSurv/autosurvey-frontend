
import { useContext, useEffect, useMemo, useState } from "react";
import OrgContent from "@/component/organizations/OrgContent";
import { OrgContext } from "@/helper/context";
import { initOrg } from "@/helper/initializer";

export default function Orgs() {
    const { setFilterYears, setFilterCountries, setFilterLocations, setOrganization } = useContext(OrgContext);

    useEffect(() => {
        setOrganization(initOrg);
        setFilterCountries([]);
        setFilterLocations([]);
        setFilterYears([]);
    }, [])


    return (
        <main className="org-main">
            <div className="org-content-container">
                <OrgContent />
            </div>
        </main>

    )

}