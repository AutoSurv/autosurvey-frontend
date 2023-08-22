import * as React from 'react';
import Link from 'next/link';
import { Survey, Organization } from '@/type/type';
import { useContext, useEffect, useState } from 'react';
import { Box, Collapse, IconButton, TableCell, TableRow } from '@mui/material';
import { Button, Form, Icon, Input, Label } from 'semantic-ui-react';
import { getOrganization, updateSurvey } from '@/helper/apiService';
import { OrgContext } from '@/helper/context';
import CollapseUpdate from './CollapseUpdate';

type SurveyCardProp = {
    organization: Organization,
    propSurvey: Survey
}

export default function SurveyRecord(props: SurveyCardProp) {
    const { propSurvey, organization } = props;
    const [actualSurvey, setActualSurvey] = useState(propSurvey);
    const { survey, setSurvey } = useContext(OrgContext);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log("surveyRecord.organization.surveys: ", organization.surveys);
        console.log("surveyRecord.suervey / prop / actualSurvey: ", survey.year, propSurvey.year, actualSurvey.year);
        if (survey.id === propSurvey.id) {
          console.log("===")          
          setActualSurvey(survey);
        } else {
          setActualSurvey(propSurvey);
          console.log("!==")  
        }      
      }, [survey, actualSurvey, propSurvey] )

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
                    <Link className='survey-link' href={"/org/" + organization.orgId + "/" + actualSurvey.id}>{actualSurvey.id}</Link>
                </TableCell>
                <TableCell >
                    <Link className='survey-link' href={"/org/" + organization.orgId + "/" + actualSurvey.id}>{actualSurvey.country}</Link>
                </TableCell>
                <TableCell >
                    <Link className='survey-link' href={"/org/" + organization.orgId + "/" + actualSurvey.id}>{actualSurvey.year}</Link>
                </TableCell>
                <TableCell >
                    {localStorage.getItem("username")}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <CollapseUpdate openStatus={open} setOpenStatus={setOpen} propSurvey={actualSurvey} propOrgid={organization.orgId} propSetSurvey={setSurvey}/>
                </TableCell>
            </TableRow>
        </>

    );
}