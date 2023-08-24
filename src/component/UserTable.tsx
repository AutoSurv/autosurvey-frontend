import { addUserToOrg, setRequestOptions } from '@/helper/apiService';
import { UserID } from '@/type/type';
import * as React from 'react';
import { useState } from 'react';
import { Button, Table } from 'semantic-ui-react';


type UserProp = {
  propOrgId: string,
  propUserId: string,
  propUserName: string,
  propUserEmail: string
}



export default function UserRecord({ propOrgId, propUserId, propUserName, propUserEmail }: UserProp) {
  const [acceptStatus, setAcceptStatus] = useState(false);
  const [rejectStatus, setRejectStatus] = useState(false);

  const handleApproveClick = () => {
    const reqBody: UserID = {
      userId: propUserId
    }

    const reqOptions = setRequestOptions("PATCH", reqBody);
    addUserToOrg(propOrgId, propUserId, reqOptions)
    setAcceptStatus(true);
    setRejectStatus(false)
  }

  const handleRejectClick = () => {

    setRejectStatus(true);
    setAcceptStatus(false);
  }

  return (
    <Table.Row>
      <Table.Cell >{propUserId}</Table.Cell>
      <Table.Cell >{propUserName}</Table.Cell>
      <Table.Cell >{propUserEmail}</Table.Cell>
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