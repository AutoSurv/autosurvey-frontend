import SurveyContent from "@/component/SurveyContent";
import { OrgContext } from "@/helper/context";
import { getOrganization, getSurvey } from "@/pages/api/autosurvey";
import { Organization } from "@/pages/type/type";
import { Typography } from "@mui/material";
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react";
import { Card, CardContent } from "semantic-ui-react";


export default function SurveyDetails() {

  const  router  = useRouter();
  console.log("router.query: ",router.query);
  const { orgid, surveyid } = router.query;
  const { organization, setOrganization, survey, setSurvey} =useContext(OrgContext);

  // console.log("organization.orgId: ", organization.orgId);
  // console.log("surveyid: ", surveyid);
  // console.log("survsurvey.id: ", survey.id);
    //const [organization, setOrganization] = useState<Organization>({ orgId: "", orgName: "", surveys: [] })

  useEffect(() => {
    if (surveyid) {
      getSurvey(surveyid, setSurvey);
    }
  }, [surveyid])

  return (
    <div>
      <Card>
        <CardContent>
        <Typography gutterBottom variant="h5" component="div"> {survey && survey.id} </Typography>
        </CardContent>
      </Card>
    </div>
  )
}