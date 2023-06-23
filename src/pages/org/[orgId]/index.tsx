import SurveyContent from "@/component/SurveyContent";
import { Context } from "@/helper/context";
import { getOrganization, getOrganizations } from "@/pages/api/autosurvey";
import { Organization } from "@/pages/type/type";
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react";


export default function OrgDetails() {

  const { organization, setOrganization } = useContext(Context);

  const  router  = useRouter();
  const { orgid } = router.query;
  const [organization2, setOrganization2] = useState<Organization>({ orgId: "", orgName: "", surveys: [] })
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    if (orgid) {
      getOrganization(orgid, setOrganization2);
      console.log("organization: ", organization2);
    }
  }, [orgid])

  organization.orgName = "modified";

  return (
    <div>
      <SurveyContent propOrganization={organization2} setPropOrganization={setOrganization2} />
    </div>
  )
}