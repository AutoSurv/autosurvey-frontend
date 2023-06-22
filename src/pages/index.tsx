import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import { AutoSurvey, Organization } from './type/type'
import Button from '@mui/material/Button';
import 'semantic-ui-css/semantic.min.css'
import { Header, Icon, List } from 'semantic-ui-react'
import { Context } from '@/helper/context';
import { initOrg } from '@/helper/initializer';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  const [allSurveys, setAllSurveys] = useState<AutoSurvey[]>([]);
  const [organization, setOrganization] = useState<Organization>(initOrg);

  return (
    <>
      <Context.Provider
        value={{
          organization,
          setOrganization
        }}>
        <main className="home-body">
          <Header className="home-header" as='h1' icon textAlign='center' color='pink'>
            <Icon name='clipboard' />
            <Header.Content>Welcome to AutoSurvey</Header.Content>
          </Header>
          <div>
          <Button variant='contained' href='/org'>Sign-in</Button>
          </div>

          <footer className='home-footer'>
            <List horizontal>
              <List.Item>
                <List.Content>
                  <List.Header>Simon.H</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Marco.D</List.Header>
                </List.Content>
              </List.Item>


            </List>
          </footer>
        </main>
      </Context.Provider>
    </>
  )
}