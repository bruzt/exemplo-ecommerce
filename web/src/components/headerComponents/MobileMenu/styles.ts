import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    min-height: 100vh;
    z-index: 100;
    overflow-y: auto;

    background: rgba(1, 1, 1, 0.9);


    div.menu-header {
        height: 3.125rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }


    div.user-login,
    div.user-menu {
        height: 100%;

        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    div.user-login div.user-menu {
        width: 15.625rem;
    }

    div.menu-header button {
        width: fit-content;
        font-size: 1.25rem;
        font-weight: bold;

        border: 0;
        background: transparent;
        color: #eee;
        cursor: pointer;

        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    div.menu-header button.login {
        margin-left: 0.625rem;
    }

    div.menu-header button.login span {
        margin-left: 0.3125rem;
    }

    div.menu-header button#exit-mobile-menu {
        width: 3.125rem;
    }

    div.menu-body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    div.menu-body > * {
        margin-top: 3.125rem;
    }

    div.category-menu {
        width: 100%;
        max-width: 25rem;
    }

    details {
        margin-left: 1.25rem;
        padding: 0.25rem;
        cursor: pointer;
        color: #eee;
    }

    details summary.last-child {
        list-style: none;
        list-style-type: none;

        &::-webkit-details-marker {
            display: none;
        }
    }
`;
