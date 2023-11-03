import React from "react";

export default function Header() {
  return (
    <main className=" min-h-[30vh] w-full flex flex-col items-center justify-center mt-9">
      <div className="  mx-auto">
        <header className=" font-primary font-bold text-4xl mx-auto">
          <h1>
            Welcome to <br /> <span className="main_title_landing_page">AutoSurvey</span>
          </h1>
        </header>
      </div>
    </main>
  );
}
