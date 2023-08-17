import { Survey } from '@/type/type';
import Head from 'next/head'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Button, Form, Input, Label, Modal } from 'semantic-ui-react';
import * as XLSX from 'xlsx';

export default function Fallback() {
    const [open, setOpen] = useState(false);
    const [errMessage, setErrMessage] = useState<string>("");
    let offlineSurveys: Survey[] = [];

    const saveOfflineSurvey = (e: FormEvent<HTMLFormElement>) => {
        const actualSurvey: Survey = {
            country: e.currentTarget.country.value,
            year: e.currentTarget.year.value,
            rent: e.currentTarget.rent.value,
            utilities: e.currentTarget.utilities.value,
            food: e.currentTarget.food.value,
            basicItems: e.currentTarget.basicItems.value,
            transportation: e.currentTarget.transportation.value,
            educationTotal: e.currentTarget.educationTotal.value,
            educationSupplies: e.currentTarget.educationSupplies.value,
            educationFee: e.currentTarget.educationFee.value,
            educationType: e.currentTarget.educationType.value,
            accommodationType: e.currentTarget.accommodationType.value,
            profession: e.currentTarget.profession.value,
            locationGiven: e.currentTarget.locationGiven.value,
            locationClustered: e.currentTarget.locationClustered.value,
            numResidents: e.currentTarget.numResidents.value,
            numIncomes: e.currentTarget.numIncomes.value,
            numFullIncomes: e.currentTarget.numFullIncomes.value,
            numChildren: e.currentTarget.numChildren.value,
            totalIncome: e.currentTarget.totalIncome.value,
            comments: e.currentTarget.comments.value,
            id: "",
            orgId: "649ae1e43d45417464a41fd3",
            orgName: "MSF"
        };

        if (!localStorage.getItem("offlineSurvey")) {
            offlineSurveys.unshift(actualSurvey);
            localStorage.setItem("offlineSurvey", JSON.stringify(offlineSurveys));
            offlineSurveys = [];
        } else {
            offlineSurveys = JSON.parse(window.localStorage.getItem("offlineSurvey")!);
            offlineSurveys.push(actualSurvey);
            localStorage.setItem("offlineSurvey", JSON.stringify(offlineSurveys));
            offlineSurveys = [];
        }


    }

    const downloadExcel = (setErrorMsg: Dispatch<SetStateAction<string>>) => {
        offlineSurveys = JSON.parse(window.localStorage.getItem("offlineSurvey")!);
        const surveyAsString: string = JSON.stringify(offlineSurveys[0]);
        if (surveyAsString === undefined) {
            setErrorMsg("nothing to export");
            return;
        }
        const survey: Survey = JSON.parse(surveyAsString);
        const worksheet = XLSX.utils.json_to_sheet(offlineSurveys);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        if (offlineSurveys) {
            XLSX.writeFile(workbook, survey.orgName + "_" + survey.year + "_" + survey.country + "_" + survey.locationClustered + "_" + survey.id + ".xlsx");
            window.localStorage.clear();
        } else {
            setErrorMsg("nothing to export");
            return;
        };
        setErrorMsg("");

    };

    return (
        <>
            <Head>
                <title>Offline Page</title>
            </Head>
            <h1>This is offline fallback page</h1>
            <h2>When offline, any page route will fallback to this page</h2>
            <Modal animation={false}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button className="surveys-modal-btn" color="green"> Create Offline Survey</Button>}>
                <Modal.Header>Make New Offline Survey
                    <Button onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                    }} color="grey" floated='right'
                    >X</Button>
                </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        saveOfflineSurvey(e);
                        setOpen(false);
                    }}>
                        <Form.Field>
                            <Label>Organization</Label>
                            <Input placeholder="Name your oranization" type="text" name="orgName" pattern="^[a-zA-Z]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Country Name</Label>
                            <Input placeholder="Name your country" type="text" name="country" pattern="^[a-zA-Z]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Year</Label>
                            <Input placeholder="Year" type="text" name="year" pattern="^[0-9]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Rent</Label>
                            <Input placeholder="Rent" type="text" name="rent" pattern="^[0-9]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Utilities</Label>
                            <Input placeholder="Utilities" type="text" name="utilities" pattern="^[0-9]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Food</Label>
                            <Input placeholder="Food" type="text" name="food" pattern="^[0-9]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Basic Items</Label>
                            <Input placeholder="Basic Items" type="text" name="basicItems" pattern="^[0-9]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Transportation</Label>
                            <Input placeholder="Transportation" type="text" name="transportation" pattern="^[0-9]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Education Total</Label>
                            <Input placeholder="Education Total" type="text" name="educationTotal" pattern="^[0-9]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Education Supplies</Label>
                            <Input placeholder="Education Supplies" type="text" name="educationSupplies" pattern="^[0-9]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Education Fee</Label>
                            <Input placeholder="Education Fee" type="text" name="educationFee" pattern="^[0-9]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Education Type</Label>
                            <Input placeholder="Education Type" type="text" name="educationType" pattern="^[a-zA-Z]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Accommodation Type</Label>
                            <Input placeholder="Accommodation Type" type="text" name="accommodationType" pattern="^[a-zA-Z]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Profession</Label>
                            <Input placeholder="Profession" type="text" name="profession" pattern="^[a-zA-Z]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Location Given</Label>
                            <Input placeholder="Location Given" type="text" name="locationGiven" pattern="^[a-zA-Z]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Location Clustered</Label>
                            <Input placeholder="Location Clustered" type="text" name="locationClustered" pattern="^[a-zA-Z]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Number of Residents</Label>
                            <Input placeholder="Number of Residents" type="text" name="numResidents" pattern="^[0-9]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Number of Incomes</Label>
                            <Input placeholder="Number of Incomes" type="text" name="numIncomes" pattern="^[0-9]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Number of Full Incomes</Label>
                            <Input placeholder="Number of Full Incomes" type="text" name="numFullIncomes" pattern="^[0-9]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Number of Children</Label>
                            <Input placeholder="Number of Children" type="text" name="numChildren" pattern="^[0-9]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Total Income</Label>
                            <Input placeholder="Total Income" type="text" name="totalIncome" pattern="^[0-9]*$" />
                        </Form.Field>
                        <Form.Field>
                            <Label>Comments</Label>
                            <Input placeholder="Comments" type="text" name="comments" pattern="^[a-zA-Z]*$" />
                        </Form.Field>

                        <Button type="submit" color="green">Save Survey</Button>
                        <Button onClick={(e) => {
                            e.preventDefault();
                            setOpen(false);
                        }} color="orange"
                        >Cancel</Button>
                    </Form>
                </Modal.Content>
            </Modal>
            <Button onClick={(e) => {
                e.preventDefault();
                downloadExcel(setErrMessage);
                setOpen(false);
            }}>
                Export Survey(s)
            </Button>
        </>
    )
}


