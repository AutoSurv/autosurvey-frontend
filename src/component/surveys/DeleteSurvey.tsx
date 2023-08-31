import { OrgContext } from "@/helper/context";
import { deleteSurvey } from "@/helper/apiService";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Button, Confirm } from "semantic-ui-react";
import { Survey, Pagination } from '@/type/type';

type UpdateSurveyProps = {
  propOrgid: string;
  propSurvey: Survey;
}
export default function DelSurvey({ propOrgid, propSurvey }: UpdateSurveyProps) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const { organization, setSurveys } = useContext(OrgContext);

  return (
    <>
      <Button onClick={() => {
        setOpenConfirm(true);
      }} color="orange" basic>Delete Survey</Button><Confirm
          open={openConfirm}
          header='Remove your survey'
          content='Are you sure you want to remove your survey?'
          onCancel={() => setOpenConfirm(false)}
          onConfirm={(e) => {
            e.preventDefault();
            deleteSurvey(organization.orgId, propSurvey.id, setSurveys);
            setOpenConfirm(false);
            window.location.href = "/org/" + organization.orgId;
          }}
        />
    </>     

  )
}