import styled from 'styled-components';
import { FaPencilAlt } from 'react-icons/fa';

export const PencilIcon = styled(FaPencilAlt)`
    font-size: 20px;
    color: ${(props) => props.theme.warning};
`;
