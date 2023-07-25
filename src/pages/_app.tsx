import '@/styles/home.css'
import '@/styles/orgcard.css'
import '@/styles/surveycard.css'
import '@/styles/specificsurvey.css'
import 'semantic-ui-css/semantic.min.css'
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
  const [filterLocation, setFilterLocation] = useState<string[]>([]);

  return (

      <OrgContext.Provider value={{ 
        organization, setOrganization, 
        survey, setSurvey, setSurveys, setSignUpStatus, 
        signUpStatus, 
        userNameAuth, setUserNameAuth, 
        filterLocation, setFilterLocation,
        }}>
      <Component {...pageProps} />
      </OrgContext.Provider>

  )
}
