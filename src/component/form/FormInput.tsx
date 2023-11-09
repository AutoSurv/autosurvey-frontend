import React from "react";

export default function FormInput(props: any) {
  const {
    label,
    type = "text",
    id = "text",
    name = "text",
    value,
    placeholder = "text",
    onChange,
  } = props;

  return (
    <>
      <label className="">
        <input
          className="   bg-white placeholder:translate-x-6 align-middle w-full outline-none px-[10px] py-[10px] border border-black/25 text-black/25   focus:border-primary  "
          type={type}
          required
          id={id}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </label>
    </>
  );
}
