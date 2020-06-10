import React, { useState, useEffect } from 'react';

export default function ForgotPassword({ setForgotPassword }) {

    const [getEmail, setEmail] = useState('');

    const [getDisabledSendButton, setDisabledSendButton] = useState(true);

    useEffect( () => {

        if(getEmail.length > 7) setDisabledSendButton(false);
        else setDisabledSendButton(true);

    }, [getEmail])

    async function handleSendButton(event){

        event.preventDefault();

        try {

            // to do
            
        } catch (error) {
            console.log(error);
            alert('Erro ao enviar email');
        }
    }

    return (
        <>
            <form className='forgot-password'>
                <label htmlFor="forgot-pass-input">Email cadastrado</label>
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
                    Enviar
                </button>

                <a
                    onClick={() => setForgotPassword(false)}
                >
                    Voltar para Login
                </a>
            </form>

            <style jsx>{`
                .forgot-password {
                    height: 300px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .forgot-password input#forgot-pass-input {
                    height: 30px;
                    border: 0;
                    border-radius: 5px;
                    margin: 10px 0 0 0;
                    padding: 5px;
                    font-size: 20px;
                    text-align: center;
                }

                .forgot-password button {
                    margin: 20px 0 0 0;
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
                    background: #a32e39;
                }

                .forgot-password button:disabled:hover {
                    background: #bf2232;
                }

                .forgot-password a {
                    margin: 20px 0 0 0;
                    cursor: pointer;
                }
            `}</style>
        </>
    );
}
