import { addUserToOrg } from '@/helper/apiService';
import { initUser } from '@/helper/initializer';
import { User } from '@/type/type';
import * as React from 'react';
import { useState } from 'react';
import { Button, Table } from 'semantic-ui-react';


type UserProp = {
  propOrgId: string,
  propUser: User
}

export default function UserRecord({ propOrgId, propUser }: UserProp) {
  const [acceptStatus, setAcceptStatus] = useState(false);
  const [user, setUser] = useState<User>(initUser);
  const [users, setUsers] = useState<User[]>([]);

  //const [rejectStatus, setRejectStatus] = useState(false);

  const handleApproveClick = () => {

    addUserToOrg(propOrgId, propUser, setUser, setUsers);
    //setAcceptStatus(true);
    // setRejectStatus(false);
  }

  const handleDisapproveClick = () => {
    //removeUserFromOrg(propOrgId, propUser);
    // setRejectStatus(true);
    //setAcceptStatus(false);
  }

  return (
    <Table.Row>
      <Table.Cell >{propUser.userId}</Table.Cell>
      <Table.Cell >{propUser.username}</Table.Cell>
      <Table.Cell >{propUser.email}</Table.Cell>
      <Table.Cell >{propUser.roles}</Table.Cell>
      <Table.Cell >{propUser.status}</Table.Cell>
      <Table.Cell >
        {
          propUser.status === "pending" ?
            <>
              <Button onClick={handleApproveClick} color='green'>Approve</Button>
              <Button onClick={handleDisapproveClick} color='orange'>Disapprove</Button>
            </>
            : null
        }

        {
          propUser.status === "disapproved" ?
            <>
              <Button onClick={handleApproveClick} color='green'>Approve</Button>
            </>
            : null
        }

        {
          propUser.status === "approved" ?
            <>
              <Button onClick={handleApproveClick} color='orange'>Disapprove</Button>
            </>
            : null
        }


      </Table.Cell>
    </Table.Row>
  );
}