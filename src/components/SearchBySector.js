import Select from "react-select";
import { useState } from "react";

export default function SearchBySector(props) {
  const [innerSearch, setInnerSearch] = useState("");
  return (
    <div>
      <Select
        className="basic-single"
        classNamePrefix="select"
        isClearable={props.isClearable}
        isSearchable={props.isSearchable}
        placeholder={props.placeholder}
        onChange={(x) => {
          setInnerSearch(x.value);
        }}
        onInputChange={props.onChange(innerSearch)}
        //name="color"
        options={props.sectors}
      />
    </div>
  );
}
