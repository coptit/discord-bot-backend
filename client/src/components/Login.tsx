import { useState } from "react";
import * as EmailValidator from "email-validator";
import { client } from "../App";

export function Login({ setAuth }: { setAuth: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [continueButtonDisabled, setContinueButtonDisabled] = useState(true);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-[#FDA769] w-96 h-72 m-8 min-w-[360px] rounded drop-shadow-2xl">
        <div className="flex flex-col px-7 ">
          <span className="text-xl py-2">Email</span>
          <input
            placeholder="Your Email"
            type="email"
            id="email"
            autoComplete="email"
            className="p-2 rounded border-solid border-2 border-black py-2 m-2"
            onChange={(e) => {
              setEmail(e.target.value);

              if (EmailValidator.validate(email)) {
                setContinueButtonDisabled(false);
              } else {
                setContinueButtonDisabled(true);
              }
            }}
          />

          <span className="text-xl py-2">Password</span>
          <input
            placeholder="Your Password"
            type="password"
            id="password"
            className="p-2 rounded border-solid border-2 border-black py-2 m-2"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button
            disabled={continueButtonDisabled}
            className="bg-[#ABC270] p-2 rounded-l mx-14 my-4 border-solid border-2 border-[#697d36] hover:scale-105 duration-300 hover:bg-[#87a145] disabled:opacity-50 disabled:scale-100 disabled:hover:bg-[#ABC270]"
            onClick={async (e) => {
              e.preventDefault;

              const res = await client.auth.mutate({
                email,
                password,
              });

              if (res.auth) {
                setAuth(true);
              }
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}