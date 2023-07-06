import { Link } from "@mui/material";
import { signOut } from "next-auth/react";
import { Button, Menu } from "semantic-ui-react";

type NavigationProps = {
  userEmail: string
}

export function Navigation() {
  
  return(
    <Menu size='small' color="blue">
    <Menu.Item> 
      <Link href={"/org/"} style={{ textDecoration: 'none' }}>Organizations</Link>
    </Menu.Item>
    <Menu.Menu position='right'>
      <Menu.Item> 
        <Link href={"/"} style={{ textDecoration: 'none' }} >About</Link>
      </Menu.Item>
      <Menu.Item>
        <Button circular icon='sign out' color='blue' inverted onClick={() => signOut()}></Button>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
  )
}
 