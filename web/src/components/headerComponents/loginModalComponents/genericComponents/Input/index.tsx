import React, { InputHTMLAttributes } from 'react';

import { StyledInput } from './styles';

export default function Input({ ...rest }: InputHTMLAttributes<HTMLInputElement>){

    return <StyledInput {...rest} />;
}