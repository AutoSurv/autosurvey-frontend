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
    survey: Survey
}

export default function SurveyRecord(props: SurveyCardProp) {
    const { survey, organization } = props;
    const { setSurvey, setSurveys, setOrganization, setPagination  } = useContext(OrgContext);
    const [open, setOpen] = useState(false);
    const [errMessage, setErrMessage] = useState<string>("");

    useEffect(() => {
        async function fetchSurvey() {
          const data = await getSurvey(survey.id, setSurvey);
          console.log("fetch: ", data!.year);
          console.log("Survey: ", survey.year);
        }
           fetchSurvey();
           console.log("#3:",  survey.year);
      }, []);

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
                    <Link className='survey-link' href={"/org/" + organization.orgId + "/" + survey.id}>{survey.id}</Link>
                </TableCell>
                <TableCell >
                    <Link className='survey-link' href={"/org/" + organization.orgId + "/" + survey.id}>{survey.country}</Link>
                </TableCell>
                <TableCell >
                    <Link className='survey-link' href={"/org/" + organization.orgId + "/" + survey.id}>{survey.year}</Link>
                </TableCell>
                <TableCell >
                    {localStorage.getItem("username")}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            {/*  <Typography variant="h6" gutterBottom component="div">
                                Survey Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Country</TableCell>
                                        <TableCell>Year</TableCell>
                                        <TableCell align="right">Location Clustered</TableCell>
                                        <TableCell align="right">Location Given</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <Form>
                                        <TableRow>
                                            <Form.Field>
                                            <TableCell component="th" scope="row">
                                            <Input placeholder= {props.survey.country} type="text" name="country" pattern="^[a-zA-Z]*$"/>  {props.survey.country}
                                            </TableCell>
                                            </Form.Field>
                                            <TableCell>{props.survey.year}</TableCell>
                                            <TableCell align="right">{props.survey.locationClustered}</TableCell>
                                            <TableCell align="right">
                                                {props.survey.locationGiven}
                                            </TableCell>
                                        </TableRow>
                                    </Form>
                                </TableBody>
                            </Table> */}
                            <Form className="surveys-form" onSubmit={(e) => {
                                e.preventDefault();
                                updateSurvey(survey.id, e, setSurvey, setOpen, setErrMessage, survey.orgId, setOrganization);
                            }} >
                                <Form.Group className="surveys-form-edit" >
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Country</Label>
                                        <Input placeholder={survey.country} type="text" name="country" pattern="^[a-zA-Z]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Year</Label>
                                        <Input placeholder={survey.year} type="text" name="year" pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Rent</Label>
                                        <Input placeholder={survey.rent} type="text" name="rent" pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Utilities</Label>
                                        <Input placeholder={survey.utilities} type="text" name="utilities" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Food</Label>
                                        <Input placeholder={survey.food} type="text" name="food" pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Basic Items</Label>
                                        <Input placeholder={survey.basicItems} type="text" name="basicItems" pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Transportation</Label>
                                        <Input placeholder={survey.transportation} type="text" name="transportation" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Education Total</Label>
                                        <Input placeholder={survey.educationTotal} type="text" name="educationTotal" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Education Supplies</Label>
                                        <Input placeholder={survey.educationSupplies} type="text" name="educationSupplies" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Education Fee</Label>
                                        <Input placeholder={survey.educationFee} type="text" name="educationFee" pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Education Type</Label>
                                        <Input placeholder={survey.educationType} type="text" name="educationType" pattern="^[a-zA-Z]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Accommodation Type</Label>
                                        <Input placeholder={survey.accommodationType} type="text" name="accommodationType" pattern="^[a-zA-Z]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Profession</Label>
                                        <Input placeholder={survey.profession} type="text" name="profession" pattern="^[a-zA-Z]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Location Given</Label>
                                        <Input placeholder={survey.locationGiven} type="text" name="locationGiven" pattern="^[a-zA-Z]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Location Clustered</Label>
                                        <Input placeholder={survey.locationClustered} type="text" name="locationClustered" pattern="^[a-zA-Z]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Number of Residents</Label>
                                        <Input placeholder={survey.numResidents} type="text" name="numResidents" pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Number of Incomes</Label>
                                        <Input placeholder={survey.numIncomes} type="text" name="numIncomes" pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Number of Full Incomes</Label>
                                        <Input placeholder={survey.numFullIncomes} type="text" name="numFullIncomes" pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Number of Children</Label>
                                        <Input placeholder={survey.numChildren} type="text" name="numChildren" pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Total Income</Label>
                                        <Input placeholder={survey.totalIncome} type="text" name="totalIncome" pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Comments</Label>
                                        <Input placeholder={survey.comments} type="text" name="comments" pattern="^[a-zA-Z]*$" />
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