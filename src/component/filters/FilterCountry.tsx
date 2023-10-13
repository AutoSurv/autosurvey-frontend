import { OrgContext } from "@/helper/context";
import { handleClickedCountry } from "@/helper/methods";
import { Survey } from "@/type/type";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import '../../styles/filterCountry.css'

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
  propSurveys.forEach((survey) => {
    if (uniqueSurveyCountryArray.indexOf(survey.country) === -1) {
      uniqueSurveyCountryArray.push(survey.country);
    }
  });
  const stateOptions = uniqueSurveyCountryArray
    .sort()
    .map((country: string, index: number) => (
      <option key={index} value={country}>
        {country}
      </option>
    ));

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    console.log("this is selected options", selectedOptions);
    selectedOptions.forEach((country) =>
      handleClickedCountry(country, clickedCountries, setClickedCountries)
    );
    previousStrArr = clickedCountries
      .filter((item) => item.clicked)
      .map((item) => item.country);
    setFilterCountries(selectedOptions);
    console.log("this is previous str array", previousStrArr);
    console.log("this is clicked countries", clickedCountries);

    if (selectedOptions.length === 0 && previousStrArr.length) {
      handleClickedCountry(
        selectedOptions[selectedOptions.length - 1],
        clickedCountries,
        setClickedCountries
      );
      previousStrArr = selectedOptions;
    }
    setFilterCountries(selectedOptions);
  };
  useEffect(() => {
    propSetFilteredCountry(filterCountries);
  }, [filterCountries.length]);
  return (
    <select multiple onChange={handleChange} value={filterCountries}>
      {stateOptions}
    </select>
  );

  // old code: down
  // const uniqueSurveyCountryArray: string[] = [];
  // propSurveys.map((survey) => {
  //   if (uniqueSurveyCountryArray.indexOf(survey.country) === -1) {
  //     uniqueSurveyCountryArray.push(survey.country);
  //   }
  // });

  // const stateOptions = uniqueSurveyCountryArray
  //   .sort()
  //   .map((country, index: number) => ({
  //     key: index,
  //     text: country,
  //     value: country,
  //   }));

  // const handleChange = (
  //   event: React.SyntheticEvent<HTMLElement, Event>,
  //   { value }:any
  // ) => {
  //   const strArr: string[] =
  //     typeof value === "string" ? value.split(",") : value;
  //     console.log('this is value', value)
  //     strArr.forEach(country=>handleClickedCountry(country, clickedCountries, setClickedCountries))
  //   previousStrArr = clickedCountries
  //     .filter((item) => item.clicked)
  //     .map((item) => item.country);
  //     setFilterCountries(strArr)
  //     console.log('this is previous str array', previousStrArr)
  //     console.log('this is clicked countries', clickedCountries)

  //   if (strArr.length === 0 && previousStrArr.length !== 1) {
  //     clickedCountries.map((c) => (c.clicked = false));
  //     previousStrArr = [];
  //   }

  //   if (strArr.length > previousStrArr.length) {
  //     handleClickedCountry(
  //       strArr[strArr.length - 1],
  //       clickedCountries,
  //       setClickedCountries
  //     );
  //     previousStrArr = strArr;
  //   }

  //   if (strArr.length < previousStrArr.length) {
  //     const country = previousStrArr
  //       .filter((p) => !strArr.includes(p))
  //       .toString();
  //     handleClickedCountry(country, clickedCountries, setClickedCountries);
  //     previousStrArr = strArr;
  //   }
  //   setFilterCountries(strArr);
  // };

  // useEffect(() => {
  //   propSetFilteredCountry(filterCountries);
  // }, [filterCountries.length]);

  // return (
  //   <Dropdown
  //     placeholder="Country"
  //     multiple
  //     clearable
  //     search
  //     selection
  //     options={stateOptions}
  //     onChange={handleChange}
  //     value={filterCountries}
  //   />
  // );
}
