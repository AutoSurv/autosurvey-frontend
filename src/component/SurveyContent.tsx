import { addSurvey, getSurveys } from "@/pages/api/autosurvey";
import { AutoSurvey } from "@/pages/type/type";
import { useContext, useEffect, useState } from "react";
import { Button, Form, Header, Icon, Input, Label, Menu, Modal } from "semantic-ui-react";
import SurveyCard from "./SurveyCard";
import { OrgContext } from "@/helper/context";
import Link from "next/link";
import CreateSurvey from "./CreateSurvey";
import ImportSurvey from "./ImportSurvey";



export default function SurveyContent() {
  const { organization, setOrganization } = useContext(OrgContext);
  const [surveys, setSurveys] = useState<AutoSurvey[]>([]);
  useEffect(() => {
    getSurveys(setSurveys);
  }, []);

  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");

  useEffect(() => {

  }, []);

  return (
    <div className="surveys-content">
      <Header className="home-header" as='h1' icon textAlign='center' color='pink'>
        <Header.Content><Icon name='clipboard' /> AutoSurvey</Header.Content>
      </Header>
      <Menu size='small' color="yellow" inverted>
        <Menu.Item> <Link href={"/org"}>Home</Link></Menu.Item>
        <Menu.Item> <Link href={"/org/" + organization.orgId}>Organization</Link></Menu.Item>
        <Menu.Item> <Link href={"/"}>About</Link></Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button inverted>Sign Out</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>


      <ImportSurvey />

      <CreateSurvey organization={organization} setOrganization={setOrganization} setSurveys={setSurveys} />

      <div className="surveys-surveycard-box">
        {organization.surveys.map((survey: AutoSurvey, index: number) => {
          console.log(survey);
          return (
            <SurveyCard key={index} organization={organization} survey={survey} />
          )
        })}

      </div>

    </div>
  )



}