import React, { ButtonHTMLAttributes } from 'react';
 
import { StyledButton } from './styles';

export default function Button({ children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>){

    return (
        <StyledButton {...rest}>
            {children}
        </StyledButton>
    );
}
