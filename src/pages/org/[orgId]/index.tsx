import SurveyContent from "@/component/SurveyContent";
import { OrgContext } from "@/helper/context";
import { getOrganization } from "@/pages/api/autosurvey";
import { useRouter } from "next/router"
import { useContext, useEffect } from "react";


export default function OrgDetails() {


  const  router  = useRouter();
  const { orgid } = router.query;
  const { organization, setOrganization} =useContext(OrgContext);

  useEffect(() => {
    const { orgid } = router.query;
    if (orgid) {
      getOrganization(organization.orgId, setOrganization);
      console.log("1 : ", orgid);
      console.log("2 : ",organization);
    }
  }, [])

  return (
    <div>
      <SurveyContent />
    </div>
  )
}