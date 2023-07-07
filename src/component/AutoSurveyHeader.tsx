import { OrgContext } from "@/helper/context";
import { SignOut } from "@/helper/methods";
import Link from "next/link";
import { useContext } from "react";
import { Button, Header, Icon, Menu } from "semantic-ui-react";


export function AutoSurveyHeader() {
  const { setSignUpStatus} = useContext(OrgContext);
  return(
    <>
      <Header className="home-header" as='h1' icon textAlign='center' color='blue' >
        <Header.Content><Icon name='clipboard' />AutoSurvey</Header.Content>
      </Header>
      <Menu size='small' color="blue">
        <Menu.Item> <Link href={"/"} style={{ textDecoration: 'none' }}>Home</Link></Menu.Item>
        <Menu.Item> <Link href={"/org"} style={{ textDecoration: 'none' }}>Organization</Link></Menu.Item>
        <Menu.Item> <Link href={"/"} style={{ textDecoration: 'none' }}>About</Link></Menu.Item>
        <Menu.Menu position='right'>
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
  )
}