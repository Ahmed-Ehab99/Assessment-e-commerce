"use client";

import FormsHeader from "./FormsHeader";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { useTranslation } from "react-i18next";

interface AuthSecProps {
  setIsStep1Valid?: (valid: boolean) => void;
  setAuthType?: (type: "signin" | "signup" | null) => void;
  disableRedirect?: boolean;
}

const AuthSec = ({
  setIsStep1Valid,
  setAuthType,
  disableRedirect,
}: AuthSecProps) => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto my-16 max-w-5xl px-3">
      <FormsHeader
        className="text-5xl lg:text-[3.65rem]"
        title={t("auth.title")}
        subTitle={t("auth.subTitle")}
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <SignInForm
          onValidChange={setIsStep1Valid}
          onAuthSuccess={() => setAuthType?.("signin")}
          disableRedirect={disableRedirect}
        />
        <SignUpForm
          onValidChange={setIsStep1Valid}
          onAuthSuccess={() => setAuthType?.("signup")}
          disableRedirect={disableRedirect}
        />
      </div>
    </div>
  );
};

export default AuthSec;
