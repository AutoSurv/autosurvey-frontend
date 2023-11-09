import React from "react";
import { Message } from "semantic-ui-react";
import { motion } from "framer-motion";

export default function RegistrationSuccessMessage() {
  return (
    <div>
      <Message success>
        <Message.Header className="font-primary text-secondary font-light tracking-wide">
          <p>
            {" "}
            Your user registration was successful If you wish to be added as a
            manager for the organization, please contact the admins:
          </p>
          <div className=" w-screen">
            <p>
              <a href="mailto:seongbong.hong@appliedtechnology.se">
                seongbong.hong@appliedtechnology.se
              </a>
            </p>

            <p>
              {" "}
              <a href="mailto:marco.debernardi@appliedtechnology.se">
                marco.debernardi@appliedtechnology.se
              </a>
            </p>
          </div>
          .
        </Message.Header>
        <br />
        <Message.Content>
          You may now log in with the username you have chosen
        </Message.Content>
      </Message>
    </div>
  );
}
