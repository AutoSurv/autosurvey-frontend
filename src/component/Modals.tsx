import React, { useState } from "react";
type Props = {
  isvisible: boolean,
  // fix this any
  onClose: any,
  children?: React.ReactNode
};

export default function Modals({ isvisible, onClose,children }: Props) {
  if (!isvisible) return null;
  const handleClose= (e:React.MouseEvent<HTMLDivElement>)=>{
    if((e.target as HTMLDivElement).id === "wrapper"){
      onClose()
    }
  }
  return (
    <div className="  fixed inset-0   bg-opacity-25 backdrop-blur-sm flex justify-center items-center " id="wrapper" onClick={handleClose}>
      <div className="  mx-auto  bg-white/60 w-[400px]  flex flex-col rounded-lg">
        <button
          onClick={onClose}
          className="  text-secondary bg-primary px-[10px] py-[3px] rounded-md text-lg  place-self-end font-bold "
        >
          X
        </button>
        <div className="bg-white/60 p-2 ">{children}</div>
      </div>
    </div>
  );
}
