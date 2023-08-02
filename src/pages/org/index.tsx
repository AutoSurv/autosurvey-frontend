
import {  useEffect, useState } from "react";
import { getOrganizations } from "../../helper/apiService";
import { Organization } from "../../type/type";
import OrgContent from "@/component/organizations/OrgContent";

export default function Orgs() {

    const [organizations, setOrganizations] = useState<Organization[]>([]);
    useEffect(() => {
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