import SurveyContent from "@/component/surveys/SurveyContent";
import { OrgContext } from "@/helper/context";
import { getOrganization } from "@/helper/apiService";
import { useRouter } from "next/router"
import { useContext, useEffect } from "react";


export default function OrgDetails() {

  const  router  = useRouter();
  const { orgId } = router.query;
  const { setOrganization, organization, survey} =useContext(OrgContext);

  useEffect(() => {
    if (orgId) {
      getOrganization(orgId, setOrganization);     
    }
  }, [orgId])

  return (
    <div>
      {orgId && 
      <SurveyContent />}
    </div>
  )
}