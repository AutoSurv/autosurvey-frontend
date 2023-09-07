import { OrgContext } from "@/helper/context";
import { SignOut } from "@/helper/methods";
import Link from "next/link";
import { useContext } from "react";
import { Dropdown, Label, Menu } from "semantic-ui-react";

export default function UserOptions() {
  const { userNameAuth, setSignUpStatus, userDto } = useContext(OrgContext);

return (
  <Menu.Item>
      <Dropdown className="exp-imp-items" text={userDto.username}>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link href={"/userInfo"} style={{ textDecoration: 'none' }} >Info</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Label onClick={() => {
              setSignUpStatus(false);
              SignOut(setSignUpStatus);
            }} color='blue' >Log Out</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  </Menu.Item>
)
}