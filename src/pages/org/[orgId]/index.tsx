import SurveyContent from "@/component/SurveyContent";
import { OrgContext } from "@/helper/context";
import { getOrganization } from "@/pages/api/autosurvey";
import { useRouter } from "next/router"
import { useContext, useEffect } from "react";


export default function OrgDetails() {

  const  router  = useRouter();
  //const { orgid } = router.query;
  const { organization, setOrganization} =useContext(OrgContext);
  //console.log("orgid: ", orgid);
  
  useEffect(() => {
    if(router.isReady){
      const { orgid } = router.query;
      if (orgid) {
        getOrganization(orgid, setOrganization);
        console.log("useEffect.orgid: ", orgid);
        console.log(organization);
      }
    }
  }, [router.isReady])

  return (
    <div>
      <SurveyContent />
    </div>
  )
}