import SurveyContent from "@/component/SurveyContent";
import { OrgContext } from "@/helper/context";
import { getOrganization } from "@/pages/api/autosurvey";
import { Organization } from "@/type/type";
import { useRouter } from "next/router"
import { useContext, useEffect } from "react";


export default function OrgDetails() {

  const  router  = useRouter();
  const { orgId } = router.query;
  const { setOrganization} =useContext(OrgContext);
  console.log("router.query.orgId before useEffect: ", router.query.orgId);
  console.log("orgid before useEffect: ", orgId);
  useEffect(() => {
    console.log("router.query.orgId in useEffect: ", router.query.orgId);
    console.log("orgid before useEffect: ", orgId);
    if (orgId) {
      const organization =  getOrganization(orgId as string, setOrganization);
      console.log("organization: ", organization);
    }
    
  }, [router.query.orgId])

  console.log("router.query.orgId after: ", router.query.orgId);
  console.log("orgid before useEffect: ", orgId);

  return (
    <div>
      {//orgid && 
      <SurveyContent />}
    </div>
  )
}