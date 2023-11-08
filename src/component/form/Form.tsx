import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function Form(props: Props) {
  const { children, onSubmit } = props;

  return (
    <form
      className="form  pt-11 make-offer-form flex mt-72 flex-col gap-[16px] max-w-[450px] p-[20px]  mx-auto "
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
