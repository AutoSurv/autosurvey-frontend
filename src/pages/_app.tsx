import '@/styles/home.css'
import '@/styles/orgcard.css'
import '@/styles/surveycard.css'
import '@/styles/specificsurvey.css'
import 'semantic-ui-css/semantic.min.css'
import '@/styles/about.css'
import '@/styles/login.css'
import '@/styles/userInfo.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { Survey, Organization } from '../type/type'
import { OrgContext } from '@/helper/context'
import { initOrg, initSurvey } from '@/helper/initializer'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  const [organization, setOrganization] = useState<Organization>(initOrg);
  const [survey, setSurvey] = useState<Survey>(initSurvey);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [signUpStatus, setSignUpStatus] =useState<boolean>(false);
  const [userNameAuth, setUserNameAuth] = useState<string>("");
  const [filterYears, setFilterYears] = useState<string[]>([]);
  const [filterCountries, setFilterCountries] = useState<string[]>([]);
  const [filterLocations, setFilterLocations] = useState<string[]>([]);

  return (

      <OrgContext.Provider value={{ 
        organization, setOrganization, 
        survey, setSurvey, 
        surveys, setSurveys, setSignUpStatus, 
        signUpStatus, 
        userNameAuth, setUserNameAuth, 
        filterYears, setFilterYears,
        filterCountries, setFilterCountries,
        filterLocations, setFilterLocations,

        }}>
      <Component {...pageProps} />
      </OrgContext.Provider>

  )
}
