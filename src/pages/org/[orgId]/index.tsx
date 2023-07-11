import SurveyContent from "@/component/SurveyContent";
import { OrgContext } from "@/helper/context";
import { getOrganization } from "@/pages/api/autosurvey";
import { useRouter } from "next/router"
import { useContext, useEffect } from "react";


export default function OrgDetails() {

  const  router  = useRouter();
  const { orgid } = router.query;
  const { setOrganization} =useContext(OrgContext);

  useEffect(() => {
    if (orgid) {
      getOrganization(orgid, setOrganization);
     
    }
    
  }, [orgid])

  console.log("router.query: ", router.query);
  return (
    <div>
      {orgid && 
      <SurveyContent />}
    </div>
  )
}