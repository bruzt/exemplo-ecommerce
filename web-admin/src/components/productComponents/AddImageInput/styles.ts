import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    
    div.input-group {
        display: flex;
        flex-direction: column;
    }

    div.input-group input[type=file] {
        display: none;
    }

    div.input-group button#file-input {
        height: 30px;
        cursor: pointer;
    }

    div.input-group button.remove-file {
        margin-left: 5px;
        padding: 0 3px;
        border: 0;
        border-radius: 4px;
        background: ${(props) => props.theme.danger};

        &:hover {
            background: ${(props) => props.theme.dangerActive};
        }

        &:active {
            background: ${(props) => props.theme.danger};
        }
    }
`;
