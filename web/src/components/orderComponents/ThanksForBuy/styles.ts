import styled from 'styled-components';

export const Container = styled.section`

    padding: 20px 0;
    min-height: 500px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
                
    * {
        margin: 20px 0;
    }

    h2 {
        text-align: center;
    }

    a {
        background: #0D2235;
        color: #eee;
        font-size: 20px;
        padding: 10px 20px;
        border-radius: 5px;
    }

    a:hover {
        background: #16324C;
    }

    a:active {
        background: #0D2235;
    }
`;
