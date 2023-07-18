
import { Inter } from 'next/font/google'
import 'semantic-ui-css/semantic.min.css'
import { Header, Icon, List } from 'semantic-ui-react'
import Loginpage from '@/component/Loginpage';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

        return (


        <div className="home-body">
          <Header className="home-header" as='h1' icon textAlign='center' color='blue'>
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