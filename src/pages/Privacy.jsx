import React from "react";
import { BottomBar } from "../components";

export default function Privacy() {
  const Terms = [
    {
      Tittle: "Acceptance of Terms",
      Para: "By using our app, you agree to comply with these Terms of Service. If you do not agree, please do not use the app.",
    },
    {
      Tittle: "User Conduct",
      Para: "You are responsible for maintaining the confidentiality of your account information.You agree not to engage in any unlawful or harmful activities while using the app",
    },
    {
      Tittle: "User Content",
      Para: "By using the app, you grant us the right to display your username and selected hobbies to other users for the purpose of making connections.You are solely responsible for the content you post within the app",
    },
    {
      Tittle: "Termination of Service",
      Para: "We reserve the right to terminate or suspend your account if you violate these Terms of Service or for any other reason at our discretion.",
    },
    {
      Tittle: "Limitation of Liability",
      Para: "We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the app.",
    },
  ];

  return (
    <>
      <div className="mx-4 mt-5">
        <h1 className="text-2xl font-bold ">Terms of Service</h1>
      </div>
      <div>
        <ul className="flex flex-col gap-5 px-4 mt-5">
          {Terms.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <li className="space-y-1.5">
                  <h1 className="text-lg font-semibold">{item.Tittle}</h1>
                  <p className="text-sm leading-6 ">{item.Para}</p>
                </li>
              </React.Fragment>
            );
          })}
        </ul>
      </div>

      <BottomBar />
    </>
  );
}
