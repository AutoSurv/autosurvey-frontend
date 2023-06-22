import SurveyContent from "@/component/SurveyContent";
import { getOrganization, getOrganizations } from "@/pages/api/autosurvey";
import { Organization } from "@/pages/type/type";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";


export default function OrgDetails() {

  const  router  = useRouter();
  const { orgid } = router.query;
  const [organization, setOrganization] = useState<Organization>({ orgId: "", orgName: "", surveys: [] })
  const [organizationa, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    if (orgid) {
      getOrganization(orgid, setOrganization);
    }
  }, [orgid])

  return (
    <div>
      <SurveyContent organization={organization} setOrganizations={setOrganizations} />
    </div>
  )
}