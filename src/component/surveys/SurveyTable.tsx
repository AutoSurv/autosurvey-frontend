import * as React from 'react';
import Link from 'next/link';
import { Survey, Organization } from '@/type/type';
import { useContext, useEffect, useState } from 'react';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Button, Form, Icon, Input, Label } from 'semantic-ui-react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { getOrganization, getSurvey, getSurveys, updateSurvey } from '@/helper/apiService';
import { OrgContext } from '@/helper/context';


type SurveyCardProp = {
    organization: Organization,
    propSurvey: Survey
}

export default function SurveyRecord(props: SurveyCardProp) {
    const { propSurvey, organization } = props;
    const [actualSurvey, setActualSurevey] = useState(propSurvey);
    const { survey, setSurvey } = useContext(OrgContext);
    const [open, setOpen] = useState(false);
    const [errMessage, setErrMessage] = useState<string>("");

    useEffect(() => {

        if (survey.id === propSurvey.id) {        
            setActualSurevey(survey);
          }      
             
      }, [survey] )

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
                    <Link className='survey-link' href={"/org/" + organization.orgId + "/" + survey.id}>{actualSurvey.id}</Link>
                </TableCell>
                <TableCell >
                    <Link className='survey-link' href={"/org/" + organization.orgId + "/" + survey.id}>{actualSurvey.country}</Link>
                </TableCell>
                <TableCell >
                    <Link className='survey-link' href={"/org/" + organization.orgId + "/" + survey.id}>{actualSurvey.year}</Link>
                </TableCell>
                <TableCell >
                    {localStorage.getItem("username")}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                        
                            <Form className="surveys-form" onSubmit={(e) => {
                                e.preventDefault();
                                updateSurvey(propSurvey.id, e, setSurvey, setOpen, setErrMessage, propSurvey.orgId);
                            }} >
                                <Form.Group className="surveys-form-edit" >
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Country</Label>
                                        <Input placeholder={actualSurvey.country} type="text" name="country" pattern="^[a-zA-Z]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Year</Label>
                                        <Input placeholder={actualSurvey.year} type="text" name="year" pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Rent</Label>
                                        <Input placeholder={actualSurvey.rent} type="text" name="rent" pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Utilities</Label>
                                        <Input placeholder={actualSurvey.utilities} type="text" name="utilities" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Food</Label>
                                        <Input placeholder={actualSurvey.food} type="text" name="food" pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Basic Items</Label>
                                        <Input placeholder={actualSurvey.basicItems} type="text" name="basicItems" pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Transportation</Label>
                                        <Input placeholder={actualSurvey.transportation} type="text" name="transportation" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Education Total</Label>
                                        <Input placeholder={actualSurvey.educationTotal} type="text" name="educationTotal" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Education Supplies</Label>
                                        <Input placeholder={actualSurvey.educationSupplies} type="text" name="educationSupplies" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Education Fee</Label>
                                        <Input placeholder={actualSurvey.educationFee} type="text" name="educationFee" pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Education Type</Label>
                                        <Input placeholder={actualSurvey.educationType} type="text" name="educationType" pattern="^[a-zA-Z]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Accommodation Type</Label>
                                        <Input placeholder={actualSurvey.accommodationType} type="text" name="accommodationType" pattern="^[a-zA-Z]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Profession</Label>
                                        <Input placeholder={actualSurvey.profession} type="text" name="profession" pattern="^[a-zA-Z]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Location Given</Label>
                                        <Input placeholder={actualSurvey.locationGiven} type="text" name="locationGiven" pattern="^[a-zA-Z]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Location Clustered</Label>
                                        <Input placeholder={actualSurvey.locationClustered} type="text" name="locationClustered" pattern="^[a-zA-Z]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Number of Residents</Label>
                                        <Input placeholder={actualSurvey.numResidents} type="text" name="numResidents" pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Number of Incomes</Label>
                                        <Input placeholder={actualSurvey.numIncomes} type="text" name="numIncomes" pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Number of Full Incomes</Label>
                                        <Input placeholder={actualSurvey.numFullIncomes} type="text" name="numFullIncomes" pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Number of Children</Label>
                                        <Input placeholder={actualSurvey.numChildren} type="text" name="numChildren" pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Total Income</Label>
                                        <Input placeholder={actualSurvey.totalIncome} type="text" name="totalIncome" pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Comments</Label>
                                        <Input placeholder={actualSurvey.comments} type="text" name="comments" pattern="^[a-zA-Z]*$" />
                                    </Form.Field>

                                </Form.Group>
                                <Button type='submit'>Submit</Button>
                            </Form>
                        </Box>

                    </Collapse>
                </TableCell>
            </TableRow>

        </>

    );
}