import { OrgContext } from "@/helper/context";
import { handleClickedCountry } from "@/helper/methods";
import { Survey } from "@/type/type";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { Dropdown, Item } from "semantic-ui-react";

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
  // propSurveys.map((survey) => {
  //   if (uniqueSurveyCountryArray.indexOf(survey.country) === -1) {
  //     uniqueSurveyCountryArray.push(survey.country);
  //   }
  // });
  propSurveys.forEach((survey) => {
    if (uniqueSurveyCountryArray.indexOf(survey.country) === -1) {
      uniqueSurveyCountryArray.push(survey.country);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value: string[] = e.target.value.split(",");
    const strArr: string[] = typeof value === "string" ? value : value;
    previousStrArr = clickedCountries
      .filter((item) => item.clicked)
      .map((item) => item.country);
      console.log(previousStrArr);

    if (strArr.length === 0 && previousStrArr.length !== 1) {
      clickedCountries.map((c) => (c.clicked = false));
      previousStrArr = [];
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
      return(
        <>
        <label htmlFor="country">Chose a country</label>
        <select
        id="country"
        name="country"
        
        multiple
        value={filterCountries}
        onChange={handleChange}
        >
          <option value="">Country</option>
          {uniqueSurveyCountryArray.map((country:string, index:number)=>(
            <option key={index} value={country}>{country}</option>
          )) }

        </select>
        </>
      )
  };
  // const stateOptions = uniqueSurveyCountryArray
  //   .sort()
  //   .map((country, index: number) => ({
  //     key: index,
  //     text: country,
  //     value: country,
  //   }));

  // const handleChange = (
  //   event: React.SyntheticEvent<HTMLElement, Event>,
  //   { value }: any
  // ) => {
  //   const strArr: string[] =
  //     typeof value === "string" ? value.split(",") : value;
  //   previousStrArr = clickedCountries
  //     .filter((item) => item.clicked)
  //     .map((item) => item.country);

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
