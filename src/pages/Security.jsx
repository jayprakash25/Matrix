import React from "react";
import { BottomBar } from "../components";

const Security = () => {
  const SecurityInfo = [
    {
      Title: "Encryption and Data Protection",
      Description:
        "We use industry-standard encryption protocols to safeguard your personal information.",
    },
    {
      Title: "Account Security",
      Description:
        "Choose a strong and unique password for your  account.",
    },
    {
      Title: "Privacy Controls",
      Description:
        "You have control over who can see your profile and interests. Customize your communication preferences to manage who can connect with you...",
    },
    {
      Title: "Data Handling",
      Description:
        "We only collect essential information needed for the functioning of the app. We do not sell or share your personal data with third parties for marketing purposes...",
    },
    {
      Title: "Incident Response",
      Description:
        "We continuously monitor our systems for any suspicious activities. If you believe you have identified a security vulnerability, please report it to our security team at chrahulofficial@gmail.com",
    },
    {
      Title: "Regular Audits and Updates",
      Description:
        "We conduct regular security audits to identify and address potential vulnerabilities in our systems. We keep our software up-to-date with the latest security patches...",
    },
    {
      Title: "Transparency",
      Description:
        "Periodically, we release a transparency report detailing any security incidents, data breaches (if any), and the actions taken to address them...",
    },
    {
      Title: "Contact Information",
      Description:
        "If you have any security-related concerns or questions, please contact our security team at chrahulofficial@gmail.com",
    },
  ];

  return (
    <>
      <div className="mx-4 my-5">
        <h1 className="text-2xl font-bold">Security </h1>
      </div>
      <div className="px-4 mb-20">
        {SecurityInfo.map((item, i) => (
          <React.Fragment key={i}>
            <section className="mb-5 space-y-2">
              <h2 className="text-lg font-semibold">{item.Title}</h2>
              <p className="text-sm leading-6">{item.Description}</p>
            </section>
          </React.Fragment>
        ))}
      </div>

      <BottomBar />
    </>
  );
};

export default Security;
