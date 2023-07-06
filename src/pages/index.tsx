
import { Inter } from 'next/font/google'
import Button from '@mui/material/Button';
import 'semantic-ui-css/semantic.min.css'
import { Header, Icon, List } from 'semantic-ui-react'
import Login from '@/component/login';
import { Navigation } from '@/component/Navigation';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  return (
   
      <main className="home-body">
        <Header className="home-header" as='h1' icon textAlign='center' color='blue' inverted>
          <Icon name='clipboard' />
          <Header.Content>Welcome to AutoSurvey</Header.Content>
        </Header>
        <Navigation />
        <div className="home-login">
          <Login />
          <Button className="home-login-btn" variant='contained' href='/org'>To Organizations</Button>
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