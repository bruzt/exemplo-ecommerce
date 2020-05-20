import React, { useState } from 'react';

import { useUser } from '../context/userContext';

export default function ModalLogin() {

    const [emailState, setEmail] = useState('');
    const [passwordState, setPasword] = useState('');

    const userContext = useUser();

    function handleLogin(event){

        event.preventDefault();

        userContext.logIn(emailState, passwordState);
    }
    
    return (
        <>
            <div className='modal'>

                <div className='modal-content'>

                    <div className="modal-head">
                        <h1>Login</h1>
                        <button 
                            type='button' 
                            className='close-modal'
                            onClick={userContext.handleSwitchModal}
                        >
                            X
                        </button>
                    </div>

                    <form>
                        <div className="email-container">
                            <label htmlFor="login-email">e-mail</label>
                            <input 
                                type='email' 
                                id="login-email"
                                value={emailState}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className="password-container">
                            <label htmlFor="login-password">Senha</label>
                            <input 
                                type='password' 
                                id="login-password"
                                value={passwordState}
                                onChange={(event) => setPasword(event.target.value)}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className='login-button'
                            onClick={(event) => handleLogin(event)}
                        >
                            Entrar
                        </button>

                    </form>

                </div>
            </div>

            <style jsx>{`
                .modal {
                    display: ${(userContext.modal) ? 'block' : 'none'};
                    position: fixed; /* Stay in place */
                    z-index: 20; /* Sit on top */
                    left: 0;
                    top: 0;
                    width: 100%; /* Full width */
                    height: 100%; /* Full height */
                    overflow: auto; /* Enable scroll if needed */
                    background-color: rgb(0,0,0); /* Fallback color */
                    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
                    transition: 1s;
                }

                .modal-content {
                    background-color: #fefefe;
                    margin: 10% auto; /* 15% from the top and centered */
                    padding: 20px;
                    width: 100%;
                    max-width: 20%;
                    height: 100%;
                    max-height: 400px;
                    border-radius: 5px;
                }

                .modal-content .modal-head {
                    display: flex;
                    justify-content: space-between;
                }

                .modal-content .close-modal {
                    width: 30px;
                    height: 30px;
                    border: 0;
                    border-radius: 5px;
                    font-weight: bold;
                    background: #a32e39;
                }

                .modal-content .close-modal:hover {
                    background: #bf2232;
                }

                .modal-content form {
                    width: 100%;
                    height: 100%;
                    padding: 60px 0 0 0;

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .modal-content form .email-container, .password-container  {
                    display: flex;
                    flex-direction: column;
                    width: 200px;
                }

                .modal-content form .password-container {
                    margin: 20px 0 0 0;
                }

                .modal-content form input {
                    font-size: 15px;
                    padding: 5px;
                    border: 1px solid #60615b;
                    border-radius: 5px;
                }

                .modal-content form .login-button {
                    margin: 20px 0 0 0;
                    width: 200px;
                    height: 30px;
                    border: 0;
                    border-radius: 5px;
                    background: #3E8C34;
                }

                .modal-content form .login-button:hover {
                    background: #41A933;
                }

                .modal-content form .login-button:active {
                    background: #3E8C34;
                }
            `}</style>
        </>
    );
}