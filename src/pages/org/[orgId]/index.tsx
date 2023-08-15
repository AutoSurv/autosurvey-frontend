import SurveyContent from "@/component/surveys/SurveyContent";
import { OrgContext } from "@/helper/context";
import { getOrganization, getOrganizations, getSurveys } from "@/helper/apiService";
import { useRouter } from "next/router"
import { useContext, useEffect } from "react";


export default function OrgDetails() {

  const  router  = useRouter();
  const { orgId } = router.query;
  const { setOrganization, setOrganizations, setPagination, setSurveys, surveys } =useContext(OrgContext);

  useEffect(() => {
    
      getOrganization(orgId!, setOrganization);
    
  }, [])

  return (
    <div>
      {orgId && 
      <SurveyContent />}
    </div>
  )
}