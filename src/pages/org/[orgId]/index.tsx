import SurveyContent from "@/component/SurveyContent";
import { OrgContext } from "@/helper/context";
import { getOrganization } from "@/pages/api/autosurvey";
import { Organization } from "@/pages/type/type";
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react";


export default function OrgDetails() {

  const  router  = useRouter();
  const { orgid } = router.query;
  //const [organization, setOrganization] = useState<Organization>({ orgId: "", orgName: "", surveys: [] })
  const { organization, setOrganization} =useContext(OrgContext);

  useEffect(() => {
    if (orgid) {
      getOrganization(orgid, setOrganization);
    }
  }, [orgid])

  return (
    <div>
      <SurveyContent />
    </div>
  )
}