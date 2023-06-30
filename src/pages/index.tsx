
import { Inter } from 'next/font/google'
import Button from '@mui/material/Button';
import 'semantic-ui-css/semantic.min.css'
import { Header, Icon, List } from 'semantic-ui-react'
import Login from '@/component/login';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  return (
   
      <main className="home-body">
        <Header className="home-header" as='h1' icon textAlign='center' color='blue' inverted>
          <Icon name='clipboard' />
          <Header.Content>Welcome to AutoSurvey</Header.Content>
        </Header>
        <div className="home-login">
          <Login />
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