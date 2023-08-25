
import { Inter } from 'next/font/google'
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Icon, List } from 'semantic-ui-react'
import Loginpage from '@/component/Loginpage';
import SignalWifiConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiConnectedNoInternet4';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

        return (


        <div className="home-body">
          <div className='home-header-container'>
          <Header className="home-header" as='h1' icon textAlign='center' color='blue'>
            <Icon name='clipboard' />
            <Header.Content>Welcome to AutoSurvey</Header.Content>
          </Header>
          </div>

          <Loginpage></Loginpage>
          <div className="home-offlinemode-container">
          <Button color='orange'> <Link href="/_offline" style={{color : 'white'}}>Offline Mode <SignalWifiConnectedNoInternet4Icon fontSize='small' /></Link></Button>
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
        </div>


      )
}