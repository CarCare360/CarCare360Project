import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({ options, handleSelectedOptions }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelection = (newValue) => {
    setSelectedOptions(newValue);
  };

  useEffect(() => {
    handleSelectedOptions(selectedOptions);
  }, [selectedOptions, handleSelectedOptions]);

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      value={selectedOptions}
      isOptionEqualToValue={(option, value) =>
        option.name === value.name && option.id === value.id
      }
      onChange={(_, newValue) => {
        handleSelection(newValue);
      }}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Groups" placeholder="" />
      )}
    />
  );
}
