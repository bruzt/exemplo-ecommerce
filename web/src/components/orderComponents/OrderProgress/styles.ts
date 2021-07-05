import styled from 'styled-components';

export const Container = styled.div`

    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 3.125rem 0 3.125rem 0;

    .circle {
        width: 3.125rem;
        height: 3.125rem;
        flex-shrink: 0;

        display: flex;
        justify-content: center;
        align-items: center;

        position: relative;
        z-index: 5;

        border-radius: 1.5625rem;

        background: ${props => props.theme.secondary};

        &.active {
            transition: 0.2s;
            transition-delay: 0.5s;

            background: ${props => props.theme.primary};
        }
    }

    .bar {
        width: 100%;
        height: 0.3125rem;

        background: ${props => props.theme.secondary};
    }

    .bar .progress {
        width: 0px;
        height: 100%;

        background: ${props => props.theme.primary};

        &.active {
            animation: active-progress-animation 0.5s forwards;
        }
    }

    @keyframes active-progress-animation {
        from {
            width: 0px;
        }
        to {
            width: 100%;
        }
    }
`;
