import { MainTitle } from "./styled.Title";

interface Props {
    text: string
}

export const Title = ({text}: Props) => {
    return(
        <MainTitle>{text}</MainTitle>
    );
}