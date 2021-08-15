import styled from 'styled-components';

export const FormContainer = styled.form`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    &.no-no-animation {
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