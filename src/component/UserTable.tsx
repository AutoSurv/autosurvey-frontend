import * as React from 'react';
import { Button, Table } from 'semantic-ui-react';


type UserProp = {
    propUserId: string,
    propUserName: string,
    propUserEmail: string
}

const handleApproveClick = () => {

}

const handleRejectClick = () => {
    
}

export default function UserRecord({propUserId, propUserName, propUserEmail}: UserProp) {

    return (        
        <Table.Row>
            <Table.Cell >{propUserId}</Table.Cell>
            <Table.Cell >{propUserName}</Table.Cell>
            <Table.Cell >{propUserEmail}</Table.Cell>
            <Table.Cell >
                <Button onClick={handleApproveClick}>Approve</Button>
                <Button>Reject</Button>
            </Table.Cell>
        </Table.Row>       
    );
}