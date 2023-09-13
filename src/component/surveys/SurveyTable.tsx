import * as React from 'react';
import Link from 'next/link';
import { Survey, Organization } from '@/type/type';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { Box, Collapse, IconButton, TableCell, TableRow } from '@mui/material';
import { Button, Form, Icon, Input, Label } from 'semantic-ui-react';
import { updateSurvey } from '@/helper/apiService';
import { OrgContext } from '@/helper/context';
import CollapseUpdate from './CollapseUpdate';

type SurveyCardProp = {
    organization: Organization;
    setSurveys: Dispatch<SetStateAction<Survey[]>>;
    propSurvey: Survey;
}

export default function SurveyRecord(props: SurveyCardProp) {
    const { propSurvey, organization, setSurveys } = props;
    const { setSurvey, setOrganization, setFilteredSurveys, userDto } = useContext(OrgContext);
    const [open, setOpen] = useState(false);
    const [errMessage, setErrMessage] = useState<string>("");


    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <Icon name="angle up" /> : <Icon name="angle down" />}
                    </IconButton>
                </TableCell>
                <TableCell >
                    <Link className='survey-link' href={"/org/" + organization.orgId + "/" + propSurvey.id}>{propSurvey.id}</Link>
                </TableCell>
                <TableCell >
                    <Link className='survey-link' href={"/org/" + organization.orgId + "/" + propSurvey.id}>{propSurvey.country}</Link>
                </TableCell>
                <TableCell >
                    <Link className='survey-link' href={"/org/" + organization.orgId + "/" + propSurvey.id}>{propSurvey.year}</Link>
                </TableCell>
                <TableCell >
                    {propSurvey.userId}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <CollapseUpdate openStatus={open} setOpenStatus={setOpen} propSurvey={propSurvey} propOrg={organization} propSetSurveys={setSurveys}/>
                </TableCell>
            </TableRow>
        </>

    );
}

function UseEffect(arg0: () => void, arg1: never[]) {
    throw new Error('Function not implemented.');
}
