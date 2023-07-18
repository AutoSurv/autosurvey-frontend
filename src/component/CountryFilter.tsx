import { OrgContext } from "@/helper/context";
import { Dropdown } from "semantic-ui-react";
import { useContext } from "react";
type TypeFilterProps = {
    country_arr: string[],
    filterValue: string[],
    filterChanged: (value: string[]) => void
}

export default function TypeFilter(props: TypeFilterProps) {
    const { filterChanged , country_arr, filterValue} = props;
    const { organization, setOrganization, setSignUpStatus } = useContext(OrgContext);

    const stateOptions = country_arr.map((c, index) => ({
        key: index,
        text: c,
        value: c,
    }));

    return (
        <Dropdown
            text='Filter'
            multiple
            options={stateOptions}
            onChange={(e, data) => {
                const filterValue = data.value as string[];
                filterChanged(filterValue);
            }}

        />
    )
}