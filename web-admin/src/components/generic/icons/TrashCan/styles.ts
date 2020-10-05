import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';

export const TrashIcon = styled(FaTrashAlt)`
    font-size: 20px;
    color: ${(props) => props.theme.danger};
`;
