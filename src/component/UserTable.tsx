import * as React from 'react';
import { Button, Table } from 'semantic-ui-react';
import Link from 'next/link';
import { Survey, Organization } from '@/type/type';
import { useContext, useEffect, useState } from 'react';
import { OrgContext } from '@/helper/context';

type UserProp = {
    propUserId: string,
    propUserName: string,
    propUserEmail: string
}

export default function UserRecord({propUserId, propUserName, propUserEmail}: UserProp) {

    return (        
        <Table.Row>
            <Table.Cell >{propUserId}</Table.Cell>
            <Table.Cell >{propUserName}</Table.Cell>
            <Table.Cell >{propUserEmail}</Table.Cell>
            <Table.Cell >
                <Button>Approve</Button>
                <Button>Reject</Button>
            </Table.Cell>
        </Table.Row>       
    );
}