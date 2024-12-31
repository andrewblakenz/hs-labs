"use client";

import React, { useState } from "react";
import { subscribeToKit } from "@/utils/subscribeToKit";

const Subscribe = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [subscribing, setSubscribing] = useState<boolean>(false);
  const [emailStatus, setEmailStatus] = useState<"unsent" | "sent" | "error">("unsent");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleSubmit = async () => {
    setSubscribing(true);
    const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailInput !== "") {
      if (validateEmail.test(emailInput)) {
        const result = await subscribeToKit(emailInput);
        if (result === "success") {
          setEmailStatus("sent");
          setStatusMessage("Thank you for subscribing! You should recieve an email from us shortly to confirm!");
        } else {
          setEmailStatus("error");
          setStatusMessage(
            "Apologies, we were unable to set up your subsciption at this time. Please try again later!"
          );
        }
      } else {
        setEmailStatus("error");
        setStatusMessage("Please provide a valid email address");
      }
    } else {
      setEmailStatus("error");
      setStatusMessage("Please provide a valid email address");
    }
    setSubscribing(false);
  };
  return (
    <div className="sidebar__subscribe__wrapper">
      {emailStatus !== "sent" && (
        <div className="sidebar__subscribe">
          <div className="sidebar__subscribe__input">
            <input
              className="sidebar__subscribe__input__inner"
              type="email"
              placeholder="Your Email"
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </div>
          {!subscribing ? (
            <div className="sidebar__subscribe__button button" onClick={() => handleSubmit()}>
              Subscribing
            </div>
          ) : (
            <div className="sidebar__subscribe__button button disabled">
              Subscribing <div className="button-loader"></div>
            </div>
          )}
        </div>
      )}
      {emailStatus !== "unsent" && <p className="sidebar__subscribe__message">{statusMessage}</p>}
    </div>
  );
};

export default Subscribe;
