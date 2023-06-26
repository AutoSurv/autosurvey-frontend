
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { AutoSurvey, Organization } from './type/type'
import Button from '@mui/material/Button';
import 'semantic-ui-css/semantic.min.css'
import { Header, Icon, List } from 'semantic-ui-react'
import { OrgContext } from '@/helper/context';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  

  return (
    
   
      <main className="home-body">
        <Header className="home-header" as='h1' icon textAlign='center' color='pink'>
          <Icon name='clipboard' />
          <Header.Content>Welcome to AutoSurvey</Header.Content>
        </Header>
        <div className="home-login">
         <Button className="home-login-btn" variant='contained' href='/org'>Sign-in</Button>
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
    
    
  )
}