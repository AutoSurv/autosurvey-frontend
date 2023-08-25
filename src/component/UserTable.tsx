import { addUserToOrg, setRequestOptions } from '@/helper/apiService';
import { User, UserID } from '@/type/type';
import * as React from 'react';
import { useState } from 'react';
import { Button, Table } from 'semantic-ui-react';


type UserProp = {
  propOrgId: string,
  propUser: User
}

export default function UserRecord({ propOrgId, propUser }: UserProp) {
  const [acceptStatus, setAcceptStatus] = useState(false);
  const [rejectStatus, setRejectStatus] = useState(false);

  const handleApproveClick = () => {
    const reqBody: UserID = {
      userId: propUser.userId
    }

    const reqOptions = setRequestOptions("PATCH", reqBody);
    addUserToOrg(propOrgId, reqOptions)
    setAcceptStatus(true);
    setRejectStatus(false)
  }

  const handleRejectClick = () => {

    setRejectStatus(true);
    setAcceptStatus(false);
  }

  return (
    <Table.Row>
      <Table.Cell >{propUser.userId}</Table.Cell>
      <Table.Cell >{propUser.username}</Table.Cell>
      <Table.Cell >{propUser.email}</Table.Cell>
      <Table.Cell >{propUser.roles}</Table.Cell>
      <Table.Cell >???</Table.Cell>
      <Table.Cell >
        {
          !acceptStatus ?
          <Button onClick={handleApproveClick}>Approve</Button>
          : null
        }

        {
          !rejectStatus ?
          <Button onClick={handleRejectClick}>Reject</Button>
          : null
        }
      </Table.Cell>
    </Table.Row>
  );
}