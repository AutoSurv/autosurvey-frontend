import SurveyContent from "@/component/SurveyContent";
import { OrgContext } from "@/helper/context";
import { getOrganization } from "@/pages/api/autosurvey";
import { useRouter } from "next/router"
import { useContext, useEffect } from "react";


export default function OrgDetails() {

  const  router  = useRouter();
  //const { orgid } = router.query;
  const { setOrganization} =useContext(OrgContext);
  let orgId = "";

  useEffect(() => {
    if (router.isReady) {
      const { orgid } = router.query;
      orgId = orgid as string;
      console.log ("orgId: ", orgId);
      if (orgId != undefined && orgId != "") {
        getOrganization(orgId, setOrganization);
      }
    }
    
  }, [orgId])

  return (
    <div>
      {orgId && 
      <SurveyContent />}
    </div>
  )
}