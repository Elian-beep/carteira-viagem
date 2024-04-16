import { css } from "styled-components";
import styled from "styled-components/native";

export const AreaForm = styled.View`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const GroupForm = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const InptText = styled.TextInput<{ isText: boolean }>`
    border-bottom-width: .5px;
    ${(props) => css`
        width: ${props.isText ? '70%' : '20%'}
    `}
    /* ${(props) => css`
        width: ${props.isText ? '55%' : '20%'}
    `} */
`;

export const AreaCalendar = styled.Pressable`
    display: flex;
    flex-direction: row;
    gap: 18px;
    align-items: center;
    padding: 8px 12px;
    background-color: #d1dced;
    border-radius: 5px;
`;

export const TextDate = styled.Text``;