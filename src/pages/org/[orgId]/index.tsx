import CountryContent from "@/component/CountryContent";
import { addCountry, getCountries, getOrganization, getOrganizations } from "@/pages/api/autosurvey";
import { Country, Organization } from "@/pages/type/type";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";


export default function OrgDetails() {

  const router = useRouter();
  const { orgid } = router.query;
  const [organization, setOrganization] = useState<Organization>({ orgId: "", orgName: "", countries: [] })

  useEffect(() => {
    if (orgid) {
      getOrganization(orgid, setOrganization);
    }
  }, [orgid])

  return (
    <div>
      <CountryContent organization={organization} />
    </div>
  )
}