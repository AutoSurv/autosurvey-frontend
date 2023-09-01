import { OrgContext } from "@/helper/context";
import { deleteSurvey } from "@/helper/apiService";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Button, Confirm } from "semantic-ui-react";
import { Survey, Pagination } from '@/type/type';

type UpdateSurveyProps = {
  propOrgid: string;
  propSurvey: Survey;
  propSetPagination: Dispatch<SetStateAction<Pagination>>;
}
export default function DelSurvey({ propOrgid, propSurvey, propSetPagination }: UpdateSurveyProps) {
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
            console.log("DeleteSurvey.DelSurvey.propSurvey.id: ", propSurvey.id);
            deleteSurvey(propOrgid, propSurvey.id, propSetPagination, setSurveys, organization);
            // setOpenConfirm(false);
            // window.location.href = "/org/" + propOrgid;
          }}
        />
    </>     

  )
}