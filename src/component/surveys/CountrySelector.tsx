import { getCountryFromJson } from "@/helper/methods";
import { CountryGeo } from "@/type/type";
import { SelectChangeEvent } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { Dropdown, Form } from "semantic-ui-react";

type CountriesDdProps ={
  propSetCountry: Dispatch<SetStateAction<string>>;
  name: string;
}

export default function CountrySelector() {
  const countries = getCountryFromJson();

  return(
    <Form.Field control='select' name="country">
      {countries.map(country => <option key={country.key} value={country.text}>{country.text}</option>)}
    </Form.Field>

  )

}