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
        height: 50px;
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
        width: 300px;
    }

    div.menu-header button {
        width: fit-content;
        font-size: 20px;
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
        margin-left: 10px;
    }

    div.menu-header button.login span {
        margin-left: 5px;
    }

    div.menu-header button#exit-mobile-menu {
        width: 50px;
    }

    div.menu-body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    div.menu-body form {
        margin-top: 50px;
    }
`;
