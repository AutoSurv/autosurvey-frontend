
import {  useEffect, useState } from "react";
import { getOrganizations, getUser } from "../api/autosurvey";
import { Organization, User } from "../../type/type";
import OrgContent from "@/component/OrgContent";

export default function Orgs() {

    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [user, setUser] = useState<User>({} as User);
    useEffect(() => {
        getOrganizations(setOrganizations);
        getUser(localStorage.getItem("username")!, setUser);

    }, [])

    return (
        <main className="org-main">
            <div className="org-content-container">
              <OrgContent user={user}/>
             
            </div>
        </main>

    )

}