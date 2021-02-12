import styled from 'styled-components';

export const Container = styled.div`

    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 50px 0 50px 0;

    .circle {
        width: 50px;
        height: 50px;

        display: flex;
        justify-content: center;
        align-items: center;

        position: relative;
        z-index: 5;

        border-radius: 25px;

        background: ${props => props.theme.secondary};

        &.active {
            transition: 0.2s;
            transition-delay: 0.5s;

            background: ${props => props.theme.primary};
        }
    }

    .line {
        width: 100%;
        max-width: 300px;
        height: 5px;

        background: ${props => props.theme.secondary};
    }

    .line .progress {
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
