import SurveyContent from "@/component/SurveyContent";
import { OrgContext } from "@/helper/context";
import { getOrganization } from "@/pages/api/autosurvey";
import { Organization } from "@/type/type";
import { useRouter } from "next/router"
import { useContext, useEffect } from "react";


export default function OrgDetails() {

  const  router  = useRouter();
  const { orgid } = router.query;
  const { setOrganization} =useContext(OrgContext);
  console.log("router.query before useEffect: ", router.query);

  useEffect(() => {
    console.log("router.query in useEffect: ", router.query);
    if (orgid) {
      const organization =  getOrganization(orgid, setOrganization);
      console.log("organization: ", organization);
    }
    
  }, [orgid])

  console.log("router.query after: ", router.query);
  return (
    <div>
      {//orgid && 
      <SurveyContent />}
    </div>
  )
}