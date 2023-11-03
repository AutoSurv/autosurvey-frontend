import { Inter } from "next/font/google";
// import 'semantic-ui-css/semantic.min.css'
import Header from "@/component/Header";
import { Button, Icon, List } from "semantic-ui-react";
import Loginpage from "@/component/Loginpage";
import SignalWifiConnectedNoInternet4Icon from "@mui/icons-material/SignalWifiConnectedNoInternet4";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <Header/>

        
        <main className=" bg-third  h-screen rounded-t-[30px] ">
          <Loginpage/>
        <div className="">
       
        </div>

        <footer className="">
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
  );
}
