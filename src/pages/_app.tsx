import '@/styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'
import { AutoSurvey, Organization } from './type/type'
import { OrgContext } from '@/helper/context'
import { initOrg, initSurvey } from '@/helper/initializer'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  const [organization, setOrganization] = useState<Organization>(initOrg);
  const [survey, setSurvey] = useState<AutoSurvey>(initSurvey);
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <OrgContext.Provider value={{ organization, setOrganization, survey, setSurvey}}>
      <Component {...pageProps} />
      </OrgContext.Provider>
    </SessionProvider>
  )
}
