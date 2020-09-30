import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
`;

export const Menu = styled.div`
    height: 1fr;
    min-height: 100vh;
    border-right: 2px solid ${props => props.theme.primary};
    background: ${props => props.theme.secondary};

    input[type=checkbox] {
        display: none;
    }

    ul {
        display: none;
        position: relative;
    }

    li span {
        position: relative;
        left: 10px;
    }

    input[type=checkbox]:checked ~ ul {
        display: block;
    }

    div.icon {
        transition: transform .1s linear;
    }

    input[type=checkbox]:checked ~ div.cb-label div.icon {
        transform: rotate(90deg);
    }

    div.cb-label, div.cb-label label, li {
        display: flex;
        align-items: center;
        overflow: hidden;
        white-space: nowrap;
        line-height: 30px;
        font-size: 20px;
        background: ${props => props.theme.primary};
        color: ${props => props.theme.color};
        padding: 5px;
        cursor: pointer;
    }

    ul li.active {
        background: ${props => props.theme.background};
    }

    div.resizable-box nav + nav {
        border-top: 1px solid ${props => props.theme.secondary};
    }

    ul li {
        background: ${props => props.theme.secondary};
        border-top: 1px solid ${props => props.theme.background};
    }
`;

export const MainContainer = styled.main`
    width: 100%;
    min-width: 800px;

    div#content {
        width: 100%;
    }
`;
