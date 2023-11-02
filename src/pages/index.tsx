import { Inter } from "next/font/google";
// import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Icon, List } from "semantic-ui-react";
import Loginpage from "@/component/Loginpage";
import SignalWifiConnectedNoInternet4Icon from "@mui/icons-material/SignalWifiConnectedNoInternet4";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main className=" min-h-[25vh] w-full flex flex-col items-center justify-center">
        <div className="  mx-auto">
          <header className=" font-primary font-bold text-4xl mx-auto">
            <h1>
              Welcome to <br /> <span className="main_title">AutoSurvey</span>
            </h1>
          </header>
        </div>
        </main>

        <Loginpage></Loginpage>
        <main>
        <div className="home-offlinemode-container">
          <button className=" ">
            {" "}
            <Link href="/_offline">
              Offline Mode{" "}
              <SignalWifiConnectedNoInternet4Icon fontSize="small" />
            </Link>
          </button>
        </div>

        <footer className="home-footer">
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
