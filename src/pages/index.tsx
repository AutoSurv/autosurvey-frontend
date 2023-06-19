import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { getCountries, getOrganizations, getSurveys } from './api/autosurvey'
import { useEffect, useState } from 'react'
import { AutoSurvey, Country, Organization } from './type/type'
import Button from '@mui/material/Button';
import 'semantic-ui-css/semantic.min.css'
import { Header, Icon, List } from 'semantic-ui-react'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  const [allSurveys, setAllSurveys] = useState<AutoSurvey[]>([]);
  const [allOrgs, setAllOrgs] = useState<Organization[]>([]);
  const [allCountries, setAllCountries] = useState<Country[]>([]);

  const getAllSurveys = async () => {
    const listOfSurvey = await getSurveys();
    setAllSurveys(listOfSurvey);
  }

  /*
  const getAllOrgs = async () => {
    const listOfOrgs = await getOrganizations();
    setAllOrgs(listOfOrgs);
  }
  */

  const getAllCountries = async () => {
    const listOfCountries = await getCountries();
    setAllCountries(listOfCountries);
  }



  useEffect(() => {
    getAllSurveys();
    //getAllOrgs();
    getAllCountries();
  }, [])

  return (
    <>
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
    </>
  )
}