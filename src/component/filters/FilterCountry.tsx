import { OrgContext } from "@/helper/context";
import { handleClickedCountry } from "@/helper/methods";
import { Survey } from "@/type/type";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";

type FilterProps = {
  propSurveys: Survey[];
  propSetFilteredCountry: Dispatch<SetStateAction<string[]>>;
};

let previousStrArr: string[] = [];

export default function FilterCountry({
  propSurveys,
  propSetFilteredCountry,
}: FilterProps) {
  const {
    filterCountries,
    setFilterCountries,
    clickedCountries,
    setClickedCountries,
  } = useContext(OrgContext);

  const uniqueSurveyCountryArray: string[] = [];
  propSurveys.map((survey) => {
    if (uniqueSurveyCountryArray.indexOf(survey.country) === -1) {
      uniqueSurveyCountryArray.push(survey.country);
    }
  });

  const stateOptions = uniqueSurveyCountryArray
    .sort()
    .map((country, index: number) => ({
      key: index,
      text: country,
      value: country,
    }));

  const handleChange = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    { value }: any
  ) => {
    const strArr: string[] =
      typeof value === "string" ? value.split(",") : value;
    previousStrArr = clickedCountries.filter(item => item.clicked).map(item => item.country);

    if (strArr.length === 0 && previousStrArr.length !== 1) {
      for (let i=0; i< previousStrArr.length; i++) {   
        handleClickedCountry(previousStrArr[i], clickedCountries, setClickedCountries);
      }
    }

    if (strArr.length > previousStrArr.length) {
      handleClickedCountry(
        strArr[strArr.length - 1],
        clickedCountries,
        setClickedCountries
      );
      previousStrArr = strArr;
    }

    if (strArr.length < previousStrArr.length) {
      const country = previousStrArr
        .filter((p) => !strArr.includes(p))
        .toString();
      handleClickedCountry(country, clickedCountries, setClickedCountries);
      previousStrArr = strArr;
    }
    setFilterCountries(strArr);    
  };

  useEffect(() => {
    propSetFilteredCountry(filterCountries);
  }, [filterCountries.length]);

  return (
    <Dropdown
      placeholder="Country"
      multiple
      clearable
      search
      selection
      options={stateOptions}
      onChange={handleChange}
      value={filterCountries}
    />
  );
}
