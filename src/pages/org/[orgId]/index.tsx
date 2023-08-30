import SurveyContent from "@/component/surveys/SurveyContent";
import { OrgContext } from "@/helper/context";
import { getOrganization } from "@/helper/apiService";
import { useRouter } from "next/router"
import { useContext, useEffect } from "react";


export default function OrgDetails() {

  const  router  = useRouter();
  const { orgId } = router.query;
  const { organization, setOrganization } =useContext(OrgContext);

  useEffect(() => {
    
     if(router.isReady){
      getOrganization(orgId!, setOrganization);
     }
      
  }, [router.isReady, setOrganization])

  return (
    <div>
      {orgId && 
      <SurveyContent orgId={orgId as string}/>}
    </div>
  )
}