import { editUserToOrg } from '@/helper/apiService';
import { initUser } from '@/helper/initializer';
import { User } from '@/type/type';
import * as React from 'react';
import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Table } from 'semantic-ui-react';


type UserProp = {
  propOrgId: string,
  propUser: User,
  setUsers: Dispatch<SetStateAction<User[]>>;
}

export default function UserRecord({ propOrgId, propUser, setUsers }: UserProp) {
  const [user, setUser] = useState<User>(initUser);
 
  const handleApproveClick = () => {
    editUserToOrg(propOrgId, propUser, setUser, setUsers);
  }

  const handleDisapproveClick = () => {
    editUserToOrg(propOrgId, propUser, setUser, setUsers);
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
              <Button onClick={handleDisapproveClick} color='orange'>Disapprove</Button>
            </>
            : null
        }


      </Table.Cell>
    </Table.Row>
  );
}