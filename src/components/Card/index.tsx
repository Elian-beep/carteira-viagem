import { TouchableOpacity } from "react-native";
import { ISpent } from "../../types/ISpent";
import { BoxActions, ContainerCard, TitleDesc } from "./styled.Card";
import { Ionicons } from "@expo/vector-icons";
import { removeSpentData } from "../../data/SpentData";

interface Props {
    spent: ISpent,
    onPressRemove: () => void,
    onPressEdit: (spentForEdit: ISpent) => void,
}

export const Card = ({ spent, onPressRemove, onPressEdit }: Props) => {

    const removeSpents = async () => {
        if(spent.id){
            await removeSpentData(spent.id)
                .then(() => console.log("[SQLite] gasto removido"))
                .catch(err => console.log(`[SQLITE] erro ao remover id ${spent.id} da tabela gasto`));
            onPressRemove();
        }
    }

    return (
        <ContainerCard>
            <BoxActions>
                <TitleDesc>{spent.desc}</TitleDesc>
                <TitleDesc>{spent.value.toFixed(2)}</TitleDesc>
            </BoxActions>
            <BoxActions>
                {spent.id &&
                    <>
                        <TouchableOpacity onPress={removeSpents}>
                            <Ionicons name="trash-bin-outline" size={25} color="red" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPressEdit(spent)}>
                            <Ionicons name="pencil-outline" size={25} color="blue" />
                        </TouchableOpacity>
                    </>
                }
            </BoxActions>
        </ContainerCard>
    );
}