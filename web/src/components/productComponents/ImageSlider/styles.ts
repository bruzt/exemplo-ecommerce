import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa'

export const Container = styled.div`

    .img-container {
        width: 100%;
        max-width: 43.75rem;
        height: 100%;
        max-height: 25rem;
        z-index: 0;
    }

    .carousel {
        z-index: 0;
    }

    li.slide button {
        width: fit-content;
        height: fit-content;

        background: transparent;
        border: 0;

        cursor: pointer;

        z-index: -1;
    }

    .img-container img {
        width: auto;
        max-width: 43.75rem;
        height: auto;
        max-height: 20.625rem;
    }

    .thumb {
        width: 4.775rem;
        height: 2.95rem;

        border: 2px solid transparent;

        cursor: pointer;

        &.selected,
        &.selected:hover {
            border: 2px solid ${props => props.theme.background};
        }

        &:hover {
            border: 2px solid transparent;
        }
    }

    .thumb img {
        width: auto;
        max-width: 4.375rem;
        height: auto;
        max-height: 2.5rem;

        display: block;
        margin: 0 auto;
    }
`;

export const ImgModal = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    z-index: 100;

    background: rgba(1,1,1,0.5);

    display: flex;
    justify-content: center;
    align-items: center;

    figure {
        width: 90vw;
        height: 90vh;

        display: flex;
        justify-content: center;
        align-items: center;

        position: relative;
    }

    img {
        width: auto;
        max-width: 100%;
        height: auto;
        max-height: 100%;
    }

    figure button {
        width: 3rem;
        height: 3rem;

        position: absolute;
        font-size: 0;

        background: #eee;
        border: 0;
        border-radius: 0.25rem;

        z-index: 10;
    }

    figure button.close {
        top: 5%;
        right: 5%;
    }

    figure button.left {
        top: 50%;
        left: 5%;
    }

    figure button.right {
        top: 50%;
        right: 5%;
    }

    @media (max-width: 720px) {
        display: none;
    }
`;

export const FaTimesStyled = styled(FaTimes)`
    width: 2rem;
    height: 2rem;

    color: ${props => props.theme.danger};
`;
