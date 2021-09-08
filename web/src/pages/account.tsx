import { useRouter } from "next/router";
import React from "react";

import AccountMenu from "../components/accountComponents/AccountMenu";
import { useUser } from "../contexts/userContext";

export default function Account() {
  const userContext = useUser();
  const router = useRouter();

  if (userContext.getLogin == false) {
    if (process.browser) router.replace("/");

    return <div></div>;
  }

  return <AccountMenu />;
}
