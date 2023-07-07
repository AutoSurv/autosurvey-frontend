
import { Inter } from 'next/font/google'
import Button from '@mui/material/Button';
import 'semantic-ui-css/semantic.min.css'
import { Header, Icon, List } from 'semantic-ui-react'
import { SignOut } from '@/helper/methods';
import Loginpage from '@/component/Loginpage';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

        return (


        <div className="home-body">
          <Header className="home-header" as='h1' icon textAlign='center' color='blue' inverted>
            <Icon name='clipboard' />
            <Header.Content>Welcome to AutoSurvey</Header.Content>
          </Header>

          <Loginpage></Loginpage>

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
        </div>


      )
}