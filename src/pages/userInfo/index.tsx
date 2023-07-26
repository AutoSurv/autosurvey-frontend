import { OrgContext } from "@/helper/context";
import { useContext, useState } from "react";
import { getUserApi } from "../api/surveyAPI";
import { User } from "@/type/type";

export default async function UserInfo() {
  const { userNameAuth } = useContext(OrgContext);
  const [user, setUser] = useState<User>();
   
  // const apiResponse = await getUserApi(userNameAuth);
  // if (apiResponse.status === 200) {
  //   const data: User = await apiResponse.json();
  //   //console.log("data: ", data);
  //   setUser(data);
  // }

  return (
    
      <main className="org-main">
        User Info:
      </main>

  )

}