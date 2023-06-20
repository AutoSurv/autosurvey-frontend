import CountryCard from "@/component/CountryCard";
import { addCountry, getCountries, getOrganization } from "@/pages/api/autosurvey";
import { Country, Organization } from "@/pages/type/type";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { Form, Input, Label, Modal } from "semantic-ui-react";


export default function OrgDetails() {

  const router = useRouter();
  const { orgid } = router.query;
  const [organization, setOrganization] = useState<Organization>({ orgId: "", orgName: "", countries: [] })
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [errMessage, setErrMessage] = useState<string>("");
  useEffect(() => {
    if (orgid) {
      getOrganization(orgid, setOrganization);
      //getCountries(setCountries);
    }
  }, [orgid])

  return (
    <div>
      <Modal animation={false}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button className="org-modal-btn"> Create Country +</Button>}>
        <Modal.Header>Make New Country</Modal.Header>
        <Modal.Content>
          <Form onSubmit={(e) => {
            e.preventDefault();
            addCountry(orgid, e, setCountries, setOpen, setErrMessage);
          }}>
            <Form.Field>
              <Label>Country Name</Label>
              <Input placeholder="Name your country" type="text" name="country" />
            </Form.Field>
            <Button type="submit">Add Country +</Button>
          </Form>
        </Modal.Content>

      </Modal>
      <div className="specific-org-body">

        {organization.countries.length > 0 && organization.countries.map(country => {
          return <CountryCard organization={organization} country={country} />
        })}
        {/* <div className="specific-org-cardcontainer">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image=""
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {organization.orgName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Create Country +</Button>
          </CardActions>
        </Card>

      </div>
 */}
      </div>
    </div>
  )
}