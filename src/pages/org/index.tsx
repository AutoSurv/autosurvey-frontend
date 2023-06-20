import { Button } from "@mui/material";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { Form, Input, Label, Modal } from "semantic-ui-react";
import { addOrganization, getOrganizations } from "../api/autosurvey";
import { OrgRequestDto, Organization } from "../type/type";
import OrgCard from "@/component/OrgCard";
import OrgContent from "@/component/OrgContent";

export default function Orgs() {

    const [organizations, setOrganizations] = useState<Organization[]>([]);

    useEffect(() => {
        getOrganizations(setOrganizations);
    }, [])

    return (
        <main className="org-main">

            <div className="org-content-container">
              <OrgContent/>
            </div>
        </main>

    )

}