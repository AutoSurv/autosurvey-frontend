import Link from "next/link";
import { Header, Icon, Menu } from "semantic-ui-react";
import UserOptions from "./UserOptions";


export function AutoSurveyHeader() {
  return(
    <>
      <Header className="home-header" as='h1' icon textAlign='center' color='blue' >
        <Header.Content><Icon name='clipboard' />AutoSurvey</Header.Content>
      </Header>
      <Menu size='small' color="blue">
        <Menu.Item> <Link href={"/"} style={{ textDecoration: 'none' }}>Home</Link></Menu.Item>
        <Menu.Item> <Link href={"/org"} style={{ textDecoration: 'none' }}>Organization</Link></Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item> <Link href={"/about"} style={{ textDecoration: 'none' }}>About</Link></Menu.Item>
          <Menu.Item>
          <UserOptions />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
</>
  )
}