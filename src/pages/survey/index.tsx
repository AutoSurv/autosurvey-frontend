import { use, useEffect, useState } from "react";
import { addOrganization, getOrganizations, getSurveys } from "../api/autosurvey";
import { AutoSurvey, OrgRequestDto, Organization } from "../type/type";
import OrgContent from "@/component/OrgContent";
import SurveyContent from "@/component/SurveyContent";

export default function Survey() {
    
    const [organization, setOrganization] = useState<Organization>({ orgId: "", orgName: "", surveys: [] });
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [surveys, setSurveys] = useState<AutoSurvey[]>([]);

    useEffect(() => {
        getSurveys(setSurveys);
    }, [])

    return (
        <main className="survey-main">

            <div className="survey-content-container">
              <SurveyContent organization={organization} setOrganizations={setOrganizations}/>
            </div>
        </main>

    )

}