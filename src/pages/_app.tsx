import '@/styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'
import { Organization } from './type/type'
import { OrgContext } from '@/helper/context'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  const [organization, setOrganization] = useState<Organization>({} as Organization);

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <OrgContext.Provider value={{ organization, setOrganization}}>
      <Component {...pageProps} />
      </OrgContext.Provider>
    </SessionProvider>
  )
}
