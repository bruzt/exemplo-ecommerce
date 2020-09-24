import styled from 'styled-components';

export const Container = styled.section`
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    table {
        margin-top: 20px;
        font-size: 20px;
        border-spacing: 0 5px;
    }

    table td {
        text-align: center;
        line-height: 50px;
        background: var(--primary);
    }

    table td:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    table td:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    div.img-container {
        width: 100px;
        height: 50px;
    }

    div.img-container img {
        width: auto;
        height: auto;
        max-width: 100px;
        max-height: 50px;
        overflow: hidden;
    }

    td.name {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    td#td-actions {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    td#td-actions button {
        height: 100%;
        border: none;
        padding: 2px;
        cursor: pointer;    
        border-radius: 2px;
    }

    td#td-actions button:nth-child(1) {
        margin-right: 5px;
        background: var(--warning);
    }

    td#td-actions button:nth-child(2) {
        background: var(--danger);
    }

    td#td-actions button:nth-child(1):active {
        background: var(--warning-active);
    }

    td#td-actions button:nth-child(2):active {
        background: var(--danger-active);
    }
`;
