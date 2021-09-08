import React, { InputHTMLAttributes } from "react";

import { StyledInput } from "./styles";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <StyledInput {...props} />;
}
