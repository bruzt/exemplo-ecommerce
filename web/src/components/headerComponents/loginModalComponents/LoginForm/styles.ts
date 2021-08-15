import styled from 'styled-components';

export const FormContainer = styled.form`
    width: 100%;
    height: 100%;
    padding: 3.75rem 0 0 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    .no-no-animation {
        animation: no-no-animation 500ms, fade paused;
    }

    .input-group  {
        display: flex;
        flex-direction: column;
        width: 18.75rem;
    }

    .input-group label {
        margin: 0 0 0 0.3125rem;
    }

    .input-group label span {
        font-size: 0.875rem;
    }

    .input-group + .input-group {
        margin: 1.25rem 0 0 0;
    }

    input {
        width: 100%;
        height: 2.5rem;
        font-size: 1.25rem;
        padding: 0.3125rem;
        border: ${props => props.theme.title === 'light' ? '1px solid #111' : 0};
        border-radius: 0.3125rem;

        &.invalid {
            border: 0.125rem solid ${props => props.theme.danger};
        }
    }

    .login-button {
        margin: 1.875rem 0 0 0;
        width: 18.75rem;
        height: 3.125rem;
        border: 0;
        border-radius: 0.3125rem;
        background: ${props => props.theme.success};
        font-size: 1.25rem;
        cursor: pointer;
        color: ${props => props.theme.color};

        display: flex;
        justify-content: center;
        align-items: center;

        &.is-fetching {
            font-size: 0;
        }

        &:hover {
            background: ${props => props.theme.successActive};
        }

        &:active {
            background: ${props => props.theme.success};
        }

        &:disabled {
            background: ${props => props.theme.danger};
        }

        &:disabled:hover {
            background: ${props => props.theme.dangerActive};
        }
    }

    @keyframes no-no-animation {
        0%, 100% {
            transform: translateX(0);
        }

        33% {
            transform: translateX(-10%);
        }

        66% {
            transform: translateX(10%);
        }
    }
`;