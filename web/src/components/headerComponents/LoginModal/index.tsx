import React, { useState, useEffect, useRef } from 'react';

import { useUser } from '../../../contexts/userContext';

import ForgotPasswordModal from '../../forgotPassComponents/ForgotPasswordModal';

import { Container } from './styles';

export default function LoginModal() {
	
	const [getName, setName] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getPassword, setPassword] = useState('');
    const [getConfirmPassword, setConfirmPassword] = useState('');

    const [getDisabledButton, setDisabledButton] = useState(true);

    const [getCreateNewAccount, setCreateNewAccount] = useState(false);
	const [getForgotPassword, setForgotPassword] = useState(false);

	const [getNonoAnimation, setNonoAnimation] = useState(false);

	const userContext = useUser();
	const formRef = useRef(null);

	useEffect( () => {
		formRef.current.addEventListener('animationend', () => setNonoAnimation(false));
	}, []);

    useEffect( () => {

        if(getCreateNewAccount){
            if(
                getName.length > 3 &&
                getEmail.length > 7 &&
                getPassword.length > 5 &&
                getConfirmPassword == getPassword
            ){
                setDisabledButton(false);
            } else {
                setDisabledButton(true);
            }
        } else {
            if(
                getEmail.length > 8 &&
                getPassword.length > 5
            ){
                setDisabledButton(false);
            } else {
                setDisabledButton(true);
            }
        }

    }, [getName, getEmail, getPassword, getConfirmPassword]);

    async function handleCreateOrLogin(event){

        event.preventDefault();

        if(getCreateNewAccount){

            userContext.createUser(getName, getEmail, getPassword);

        } else {

            const result = await userContext.logIn(getEmail, getPassword);
			
			if(!result) alert('Erro ao logar');
			
			setNonoAnimation(true);
        }
    }

    return (
        <Container>
			<div className='modal-content'>

				<div className="modal-head">
					<h1>{(getCreateNewAccount) ? 'Cadastrar' : (getForgotPassword) ? 'Recuperar' : 'Login'}</h1>
					<button 
						type='button' 
						className='close-modal'
						onClick={() => userContext.handleSwitchModal()}
					>
						X
					</button>
				</div>

				{(getForgotPassword)
					? <ForgotPasswordModal setForgotPassword={setForgotPassword} />    
					: (
						<>
							<form ref={formRef} className={`${getNonoAnimation ? 'nono-animation' : ''}`}>
								{(getCreateNewAccount) && (
									<div className="input-group">
										<label htmlFor="login-name">Nome completo</label>
										<input 
											type='text' 
											id="login-name"
											value={getName}
											onChange={(event) => setName(event.target.value)}
										/>
									</div>
								)}

								<div className="input-group">
									<label htmlFor="login-email">e-mail</label>
									<input 
										type='email' 
										id="login-email"
										value={getEmail}
										onChange={(event) => setEmail(event.target.value.trim())}
									/>
								</div>

								<div className="input-group">
									<label htmlFor="login-password">
										Senha {(getCreateNewAccount) && <span>(no mínimo 6 dígitos)</span>}
									</label>
									<input 
										type='password' 
										id="login-password"
										value={getPassword}
										onChange={(event) => setPassword(event.target.value.trim())}
									/>
								</div>

								{(getCreateNewAccount) && (
									<div className="input-group">
										<label htmlFor="login-confirm-password">Confirmar senha</label>
										<input 
											type='password' 
											id="login-confirm-password"
											value={getConfirmPassword}
											onChange={(event) => setConfirmPassword(event.target.value.trim())}
										/>
									</div>
								)}

								<button 
									type="submit" 
									className='login-button'
									disabled={getDisabledButton}
									onClick={(event) => handleCreateOrLogin(event)}
								>
									{(getCreateNewAccount) ? 'Cadastrar' : 'Entrar'}
								</button>

							</form>

							<div className='create-forgot'>
								{(getCreateNewAccount == false) && (
									<>
										<a 
											onClick={() => setCreateNewAccount(true)}
										>
											Criar nova conta
										</a> 
										<a
											onClick={() => setForgotPassword(true)}
										>
											Esqueci a senha
										</a>
									</>
								)}

								{(getCreateNewAccount) && (
									<>
										<a 
											onClick={() => setCreateNewAccount(false)}
										>
											Voltar para Login
										</a> 
									</>
								)}
							</div>
						</>
					)
				}
			</div>
		</Container>
	);
}
