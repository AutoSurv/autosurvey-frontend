import { addCountry, getCountries } from "@/pages/api/autosurvey";
import { Country, Organization } from "@/pages/type/type";
import { useEffect, useState } from "react";
import { Button, Form, Input, Label, Modal } from "semantic-ui-react";
import CountryCard from "./CountryCard";

type CountryContentProp = {
    organization: Organization;
      }

export default function CountryContent(props: CountryContentProp) {
    const { organization } = props;

    const [countries, setCountries] = useState<Country[]>([]);
    useEffect(() => {
        getCountries(setCountries);
    }, []);

    const [open, setOpen] = useState(false);
    const [errMessage, setErrMessage] = useState<string>("");

    return (
        <div className="countries-content">
           <Modal animation={false}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button className="org-modal-btn"> Create Country +</Button>}>
        <Modal.Header>Make New Country</Modal.Header>
        <Modal.Content>
          <Form onSubmit={(e) => {
            e.preventDefault();
            addCountry(organization.orgId, e, setCountries, setOpen, setErrMessage);
          }}>
            <Form.Field>
              <Label>Country Name</Label>
              <Input placeholder="Name your country" type="text" name="country" />
            </Form.Field>
            <Button type="submit">Add Country +</Button>
          </Form>
        </Modal.Content>

      </Modal>
            <div className="orgs-orgcard-box">
                {organization.countries.map((country) => {
                    return (
                        <CountryCard organization={organization} country={country} />
                    )
                })}

            </div>

        </div>
    )



}