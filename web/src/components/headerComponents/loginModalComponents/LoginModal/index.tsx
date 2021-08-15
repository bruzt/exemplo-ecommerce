import React, { useState } from 'react';

import { useUser } from '../../../../contexts/userContext';
import LoginForm from '../LoginForm';
import CreateUserForm from '../CreateUserForm';
import ForgotPasswordForm from '../ForgotPasswordForm';

import { Container } from './styles';

export default function LoginModal() {

	const [getModalOption, setModalOption] = useState<'login' | 'create' | 'forgot'>('login');

	const userContext = useUser();

	return (
		<Container data-testid='login-modal'>

			<div className='modal-card'>

				<header className="modal-head">
					{getModalOption == 'login' && <h1>Login</h1>}
					{getModalOption == 'create' && <h1>Cadastrar</h1>}
					{getModalOption == 'forgot' && <h1>Recuperar</h1>}

					<button
						type='button'
						className='close-modal'
						onClick={() => userContext.handleSwitchModal()}
					>
						X
					</button>
				</header>

				<main>
					{(getModalOption == 'login') && <LoginForm />}
					{(getModalOption == 'create') && <CreateUserForm />}
					{(getModalOption == 'forgot') && <ForgotPasswordForm  />}
				</main>

				<footer>
					{(getModalOption == 'login') && (
						<a
							onClick={() => setModalOption('create')}
							data-testid='create-new-account'
						>
							Criar nova conta
						</a>
					)}

					{(getModalOption == 'login') && (
						<a
							onClick={() => setModalOption('forgot')}
							data-testid='forgot-password'
						>
							Esqueci a senha
						</a>
					)}

					{(
						getModalOption == 'create'
						|| getModalOption == 'forgot'
					) && (
						<a
							onClick={() => setModalOption('login')}
							data-testid='back-to-login'
						>
							Voltar para Login
						</a>
					)}
				</footer>
			</div>

		</Container >
	);
}
