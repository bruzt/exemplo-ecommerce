import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;

    z-index: 100;

    display: flex;
    justify-content: center;
    align-items: center;
    
    //padding-top: calc(100vh - 50%);

    background: rgba(1,1,1,0.1);
`;
