import { OrgContext } from "@/helper/context";
import Link from "next/link";
import { useContext } from "react";
import { Button, Header, Icon, Menu } from "semantic-ui-react";
import { SignOut } from '@/helper/methods';


export default function About() {
  const { setSignUpStatus } = useContext(OrgContext);

  return(
    <>
      <>
        <Header className="home-header" as='h1' icon textAlign='center' color='blue' >
          <Header.Content><Icon name='clipboard' />AutoSurvey</Header.Content>
        </Header>
        <Menu size='small' color="blue">
          <Menu.Item> <Link href={"/org"} style={{ textDecoration: 'none' }}>Home</Link></Menu.Item>
          
          <Menu.Menu position='right'>
          <Menu.Item> <Link href={"/about"} style={{ textDecoration: 'none' }}>About</Link></Menu.Item>
            <Menu.Item>
              <Button onClick={() => {
                setSignUpStatus(false);
                SignOut(setSignUpStatus);
            }}
              circular icon='sign out' color='blue' inverted></Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </>
      <div>
        seongbong.hong@appliedtechnology.se <br />
        marco.debernardi@appliedtechnology.se <br />
      </div>
    </>
  )
}