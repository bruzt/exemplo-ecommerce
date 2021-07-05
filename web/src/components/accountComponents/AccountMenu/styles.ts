import styled from 'styled-components';

export const Container = styled.section`
    min-height: 50rem;
    margin-top: 3.75rem;

    div.menu-content-grid {
        display: grid;
        grid-template-columns: 12.5rem 1fr;
        margin-top: 1.25rem;
    }

    a.menu-item {
        width: 100%;
        height: 3.125rem;
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
        padding: 0 0.625rem;
    }

    @media (max-width: 768px) {
        div.menu-content-grid {
            grid-template-columns: 1fr;
        }

        nav.menu {
            margin-bottom: 1.25rem;
        }

        div.content {
            padding: 0;
        }
    }
`;
