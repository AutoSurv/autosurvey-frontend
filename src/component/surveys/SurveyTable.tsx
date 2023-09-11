import * as React from 'react';
import Link from 'next/link';
import { Survey, Organization } from '@/type/type';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { Box, Collapse, IconButton, TableCell, TableRow } from '@mui/material';
import { Button, Form, Icon, Input, Label } from 'semantic-ui-react';
import { updateSurvey } from '@/helper/apiService';
import { OrgContext } from '@/helper/context';

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
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>

                            <Form className="surveys-form" onSubmit={(e) => {
                                e.preventDefault();
                                updateSurvey(propSurvey.id, e, setSurvey, setOpen, setErrMessage, organization, setOrganization, setFilteredSurveys, setSurveys, userDto);
                            }} >
                                <Form.Group className="surveys-form-edit" >
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Country</Label>
                                        <Input placeholder={propSurvey.country} type="text" name="country" defaultValue={propSurvey.country} pattern="^[A-zÀ-ž\s]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Year</Label>
                                        <Input placeholder={propSurvey.year} type="text" name="year" defaultValue={propSurvey.year} pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Rent</Label>
                                        <Input placeholder={propSurvey.rent} type="text" name="rent" defaultValue={propSurvey.rent} pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Utilities</Label>
                                        <Input placeholder={propSurvey.utilities} type="text" name="utilities" defaultValue={propSurvey.utilities} pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Food</Label>
                                        <Input placeholder={propSurvey.food} type="text" name="food" defaultValue={propSurvey.food} pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Basic Items</Label>
                                        <Input placeholder={propSurvey.basicItems} type="text" name="basicItems" defaultValue={propSurvey.basicItems} pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Transportation</Label>
                                        <Input placeholder={propSurvey.transportation} type="text" name="transportation" defaultValue={propSurvey.transportation} pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Education Total</Label>
                                        <Input placeholder={propSurvey.educationTotal} type="text" name="educationTotal" defaultValue={propSurvey.educationTotal} pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Education Supplies</Label>
                                        <Input placeholder={propSurvey.educationSupplies} type="text" name="educationSupplies" defaultValue={propSurvey.educationSupplies} pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Education Fee</Label>
                                        <Input placeholder={propSurvey.educationFee} type="text" name="educationFee" defaultValue={propSurvey.educationFee} pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Education Type</Label>
                                        <Input placeholder={propSurvey.educationType} type="text" name="educationType" defaultValue={propSurvey.educationType} pattern="^[A-zÀ-ž\s\p{P}\p{S}]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Accommodation Type</Label>
                                        <Input placeholder={propSurvey.accommodationType} type="text" name="accommodationType" defaultValue={propSurvey.accommodationType} pattern="^[A-zÀ-ž\s]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Profession</Label>
                                        <Input placeholder={propSurvey.profession} type="text" name="profession" defaultValue={propSurvey.profession} pattern="^[A-zÀ-ž\s\p{P}\p{S}]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Location Given</Label>
                                        <Input placeholder={propSurvey.locationGiven} type="text" name="locationGiven" defaultValue={propSurvey.locationGiven} pattern="^[A-zÀ-ž\s\p{P}\p{S}]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Location Clustered</Label>
                                        <Input placeholder={propSurvey.locationClustered} type="text" name="locationClustered" defaultValue={propSurvey.locationClustered} pattern="^[A-zÀ-ž\s\p{P}\p{S}]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Number of Residents</Label>
                                        <Input placeholder={propSurvey.numResidents} type="text" name="numResidents" defaultValue={propSurvey.numResidents} pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Number of Incomes</Label>
                                        <Input placeholder={propSurvey.numIncomes} type="text" name="numIncomes" defaultValue={propSurvey.numIncomes} pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Number of Full Incomes</Label>
                                        <Input placeholder={propSurvey.numFullIncomes} type="text" name="numFullIncomes" defaultValue={propSurvey.numFullIncomes} pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Number of Children</Label>
                                        <Input placeholder={propSurvey.numChildren} type="text" name="numChildren" defaultValue={propSurvey.numChildren} pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Total Income</Label>
                                        <Input placeholder={propSurvey.totalIncome} type="text" name="totalIncome" defaultValue={propSurvey.totalIncome} pattern="^[0-9]*$" />
                                    </Form.Field>
                                    <Form.Field className="surveys-form-edit-field">
                                        <Label>Comments</Label>
                                        <Input placeholder={propSurvey.comments} type="text" name="comments" defaultValue={propSurvey.comments}  pattern="^[A-z0-9À-ž\s\p{P}\p{S}]*$" />
                                    </Form.Field>

                                </Form.Group>
                                <Button type='submit' color='green'>Edit</Button>
                                <Button color='orange' onClick={(e) => {
                                    e.preventDefault();
                                    setOpen(false);
                                }}>Cancel</Button>
                            </Form>
                        </Box>

                    </Collapse>
                </TableCell>
            </TableRow>
        </>

    );
}

function UseEffect(arg0: () => void, arg1: never[]) {
    throw new Error('Function not implemented.');
}
