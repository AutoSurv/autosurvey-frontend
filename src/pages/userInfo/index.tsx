import { OrgContext } from "@/helper/context";
import { useContext, useEffect, useState } from "react";
import { getUserApi } from "../api/surveyAPI";
import { User } from "@/type/type";
import Link from "next/link";
import { Button } from "semantic-ui-react";

export default function UserInfo() {
  const { userNameAuth } = useContext(OrgContext);
  const [user, setUser] = useState<User>();
   
  const getUserInfo = async () => {
   const apiResponse = await getUserApi(userNameAuth);
   if (apiResponse.status === 200) {
     const data: User = await apiResponse.json();
     setUser(data);
   }
  }
  
  useEffect(() => {
    getUserInfo();
  },[])

  return (
    
      <main className="org-main">
        <Link href={"/org"} style={{ textDecoration: 'none' }}>
          <Button>Back to Org</Button>
        </Link>
        
        <p>
          <br/>User Info:<br/>
          <br/><label>Username: {user?.username}</label><br/>
          <br/><label>Email: {user?.email}</label><br/>
          <br/><label>Role: {user?.roles}</label><br/>
          <br/><label>Id: {user?.userId}</label><br/>
        </p>
      </main>

  )

}