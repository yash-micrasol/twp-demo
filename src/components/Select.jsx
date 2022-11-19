import React from 'react';
import Select from 'react-select';

const CustomSelect = (props) => {
  const colourStyles = {
    control: (styles) => ({ ...styles, padding: '4px' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles
      };
    }
  };

  const CustomLabel = ({ label, initials }) => {
    return (
      <div className="flex gap-3 items-center">
        <p className="text-white bg-blue w-8 h-8 font-semibold flex justify-center items-center rounded-full">
          {initials}
        </p>
        <p>{label}</p>
      </div>
    );
  };

  return (
    <Select
      {...props}
      styles={colourStyles}
      formatOptionLabel={props?.isLabel ? CustomLabel : {}}
      defaultValue={props.options[0]}
      components={{
        IndicatorSeparator: () => null
      }}
    />
  );
};

export default CustomSelect;
