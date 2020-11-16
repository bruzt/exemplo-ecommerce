import styled from 'styled-components';

export const Container = styled.section`
    min-height: 800px;
    margin-top: 60px;

    div.menu-content-grid {
        display: grid;
        grid-template-columns: 200px 1fr;
        margin-top: 20px;
    }

    a.menu-item {
        width: 100%;
        height: 50px;
        background: ${props => props.theme.primary};
        cursor: pointer;
        
        display: flex;
        justify-content: center;
        align-items: center;
    }

    a.menu-item:hover {
        background: ${props => props.theme.secondary};
    }

    a.menu-item:active {
        background: ${props => props.theme.primary};
    }

    a.menu-item.active {
        background: ${props => props.theme.secondary};
    }

    a.menu-item + a.menu-item {
        border-top: 1px solid ${props => props.theme.secondary};
    }

    div.content {
        padding: 0 10px;
    }

    @media (max-width: 768px) {
        div.menu-content-grid {
            grid-template-columns: 1fr;
        }

        nav.menu {
            margin-bottom: 20px;
        }

        div.content {
            padding: 0;
        }
    }
`;
