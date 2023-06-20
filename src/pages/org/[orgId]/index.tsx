import CountryCard from "@/component/CountryCard";
import { addCountry, getCountries, getOrganization, stuff } from "@/pages/api/autosurvey";
import { Country, Organization } from "@/pages/type/type";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router"
import { use, useEffect, useState } from "react";
import { Form, Input, Label, Modal } from "semantic-ui-react";


export default function OrgDetails() {

  const  router  = useRouter();
  const { orgId } = router.query;
  const [organization, setOrganization] = useState<Organization>({ orgId: "", orgName: "", countries: [] })
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [errMessage, setErrMessage] = useState<string>("");

  useEffect(() => {
    if (router.isReady) {
      if (orgId != undefined) {
        getOrganization(orgId, setOrganization);
        getCountries(setCountries);
      }  
    }
  }, [orgId, countries.length])

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
            addCountry(orgId, e, setCountries, setOpen, setErrMessage);
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

        {countries.length > 0 && organization.countries.map(country => {
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