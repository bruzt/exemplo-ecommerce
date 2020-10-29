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
        background: #0D2235;
        cursor: pointer;
        
        display: flex;
        justify-content: center;
        align-items: center;
    }

    a.menu-item:hover {
        background: #16324C;
    }

    a.menu-item:active {
        background: #0D2235;
    }

    a.menu-item.active {
        background: #16324C;
    }

    a.menu-item + a.menu-item {
        border-top: 1px solid #1C4061;
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
