
import {  useEffect, useState } from "react";
import { getOrganizations } from "../api/autosurvey";
import { Organization } from "../../type/type";
import OrgContent from "@/component/OrgContent";

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