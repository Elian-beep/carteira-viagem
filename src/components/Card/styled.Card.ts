import styled from "styled-components/native";

export const ContainerCard = styled.View`
    width: 100%;
    padding: 10px;
    border-color: '#f1f1f1';
    border-width: 0.7px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const BoxActions = styled.View`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
`;

export const TitleDesc = styled.Text`
    font-size: 16px;
    font-weight: 500;
`;