import React, { useState, useEffect } from 'react';
import Loading from 'react-loader-spinner';

import api from '../services/api';

export default function ForgotPasswordModal({ setForgotPassword }) {

    const [getEmail, setEmail] = useState('');

    const [getSendingEmail, setSendingEmail] = useState(false);
    const [getEmailSended, setEmailSended] = useState(false);
    const [getDisabledSendButton, setDisabledSendButton] = useState(true);

    useEffect( () => {

        if(getEmail.length > 7) setDisabledSendButton(false);
        else setDisabledSendButton(true);

    }, [getEmail])

    async function handleSendButton(event){

        event.preventDefault();
        
        setDisabledSendButton(true);
        setSendingEmail(true);

        try {
            
            await api.post('/reset-password', {
                email: getEmail
            });

            setEmailSended(true);
            
        } catch (error) {
            console.log(error);

            if(error.response.data.message == 'user not found') alert('e-mail não cadastrado');
            else alert('Erro ao enviar email');
            setSendingEmail(false);
            setDisabledSendButton(false);
        }
    }

    return (
        <>
            {(getEmailSended)
                ?   <p className='forgot-password'>Enviado, verifique seu e-mail para trocar a senha.</p>
                : (
                    <div className='center'>
                        <form className='forgot-password'>
                            <label htmlFor="forgot-pass-input">e-mail cadastrado</label>
                            <input 
                                type="email"
                                id='forgot-pass-input'
                                value={getEmail}
                                onChange={(event) => setEmail(event.target.value)}
                            />

                            <button
                                type='submit'
                                disabled={getDisabledSendButton}
                                onClick={(event) => handleSendButton(event)}
                            >
                                {(getSendingEmail) ? (
                                    <Loading
                                        type="TailSpin"
                                        color='#0D2235'
                                        height={20}
                                        width={20}
                                    />
                                ) : 'Enviar'}
                            </button>

                            <a
                                onClick={() => setForgotPassword(false)}
                            >
                                Voltar para Login
                            </a>
                        </form>
                    </div>
                )
            }

            <style jsx>{`
                .center {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .forgot-password {
                    width: 100%;
                    max-width: 300px;
                    height: 300px;

                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                p.forgot-password {
                    text-align: center;
                }

                .forgot-password input#forgot-pass-input {
                    width: 100%;
                    height: 40px;
                    border: 0;
                    border-radius: 5px;
                    margin: 10px 0 0 0;
                    padding: 5px;
                    font-size: 20px;
                    text-align: center;
                }

                .forgot-password button {
                    width: 100%;
                    height: 50px;
                    margin: 30px 0 0 0;
                    padding: 10px;
                    border: 0;
                    border-radius: 5px;
                    cursor: pointer;
                    background: #3E8C34;
                    color: inherit;
                    font-size: 15px;
                }

                .forgot-password button:hover {
                    background: #41A933;
                }

                .forgot-password button:disabled {
                    background: ${(getSendingEmail) ? '#3E8C34' : '#a32e39'};
                }

                .forgot-password button:disabled:hover {
                    background: ${(getSendingEmail) ? '#41A933' : '#bf2232'} ;
                }

                .forgot-password a {
                    margin: 20px 0 0 0;
                    cursor: pointer;
                }
            `}</style>
        </>
    );
}
