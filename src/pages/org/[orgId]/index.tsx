import SurveyContent from "@/component/surveys/SurveyContent";
import { OrgContext } from "@/helper/context";
import { getOrganization, getSurvey, getSurveys } from "@/helper/apiService";
import { useRouter } from "next/router"
import { useContext, useEffect } from "react";


export default function OrgDetails() {

  const  router  = useRouter();
  const { orgId } = router.query;
  const { setPagination, setSurveys, setOrganization } =useContext(OrgContext);

  useEffect(() => {
    
     if(router.isReady){
      getOrganization(orgId!, setOrganization);
      getSurveys(setSurveys);
     }
      
  }, [router.isReady])

  return (
    <div>
      {orgId && 
      <SurveyContent orgId={orgId as string}/>}
    </div>
  )
}