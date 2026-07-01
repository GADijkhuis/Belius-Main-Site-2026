import {Button, Card, Input, Spinner, Subtitle1, useId} from "@fluentui/react-components";
import {LoginStates} from "../enums/LoginStates";
import {FormEvent, useEffect, useState} from "react";
import {checkLoginPage, navigateToPage} from "../handlers/RouteHandler";
import MessageBox from "../components/assets/MessageBar";
import logo from '../assets/belius-logo.webp';
import {signInUserPasswordless, verifyOTP} from "../handlers/UserHandler";

const LoginPage = () => {
    const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [loginState, setLoginState] = useState(LoginStates.EMAIL);
    const [email, setEmail] = useState("");
    const [otp, setOTP] = useState("");

    const emailId = useId("Email");
    const otpId = useId("Otp");

    useEffect(() => {
        checkLoginPage();
    }, []);

    async function emailClick(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (isLoading) return;

        setErrorMsg(undefined);
        setIsLoading(true);
        const result = await signInUserPasswordless(email);
        setIsLoading(false);

        if (!result) {
            setLoginState(LoginStates.OTP);
            return;
        }

        setErrorMsg(result);
    }

    async function backToEmail() {
        setErrorMsg(undefined);
        setLoginState(LoginStates.EMAIL);
    }

    async function otpClick(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (isLoading) return;

        setErrorMsg(undefined);
        const normalizedOtp = otp.replace(/\s+/g, "").trim();

        setIsLoading(true);
        const result = await verifyOTP(email, normalizedOtp);
        setIsLoading(false);

        if (!result) {
            navigateToPage("");
            return;
        }

        setErrorMsg(result);
    }

    return (
      <>
          <div className={`login-container`}>
              <Card className={`inner-login-container`}>
                  {errorMsg && <MessageBox intent={"error"} title={""} message={errorMsg} closeButtonFunction={() => {setErrorMsg(undefined)}}/> }
                  <div className={`flex flex-column flex-gap-small`}>
                      <div className={`flex flex-gap-small`}>
                          <img alt="Klokking Icon" src={logo} className={`login-icon`} />
                          <div>
                              <div className={`flex flex-gap-small`}>
                                  <Subtitle1>Welkom bij Belius</Subtitle1>
                                  { isLoading && <Spinner size={`extra-small`}/> }
                              </div>
                              <p className={`text-no-margin`}>{ loginState === LoginStates.EMAIL ? `Voer een email adres in` : `Een email met een code is verzonden naar ${email}.` }</p>
                          </div>
                      </div>
                  </div>
                  { loginState === LoginStates.EMAIL &&
                      <form className={`flex flex-column flex-gap-small`} onSubmit={emailClick}>
                          <Input
                              type={`email`}
                              id={emailId}
                              autoComplete={`email`}
                              placeholder="Email"
                              className={`width-100`}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                          />
                          <div className={`flex flex-justify-end width-100`}>
                              <Button as={"button"} className={`button`} type={`submit`} appearance={`primary`} disabled={isLoading}>
                                  Inloggen
                              </Button>
                          </div>
                      </form>
                  }
                  { loginState === LoginStates.OTP &&
                      <form className={`flex flex-column flex-gap-small`} onSubmit={otpClick}>
                          <Input
                              type={`text`}
                              id={otpId}
                              autoComplete={`one-time-code`}
                              inputMode={`numeric`}
                              placeholder="Code"
                              className={`width-100`}
                              value={otp}
                              onChange={(e) => setOTP(e.target.value)}
                              onInput={(e) => setOTP((e.target as HTMLInputElement).value)}
                          />
                          <div className={`flex flex-space-between width-100`}>
                              <Button as={`a`} className={`button`} appearance={`subtle`} onClick={backToEmail}>
                                  Email wijzigen
                              </Button>
                              <Button as={"button"} className={`button`} type={`submit`} appearance={`primary`} disabled={isLoading || !otp.trim()}>
                                  Code valideren
                              </Button>
                          </div>
                          <p className={`text-small text-no-margin text-center text-sub`}>Let op, de email wordt verzonden via no-reply@gadijkhuis.nl</p>
                      </form>
                  }

              </Card>
          </div>
      </>
    );
}

export default LoginPage;