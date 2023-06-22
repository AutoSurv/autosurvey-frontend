import { Organization } from "@/pages/type/type";
import { initOrg } from "./initializer";
import {
  Dispatch,
  SetStateAction,
  createContext,
} from "react";


export interface MyContextValue {
  organization: Organization
  setOrganization: Dispatch<SetStateAction<Organization>>;
}

export const Context = createContext<MyContextValue>({
  organization: initOrg,
  setOrganization: () => {}
});