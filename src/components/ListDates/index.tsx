import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ISpent } from "../../types/ISpent";
import { getDateSpentData, getSpentData, getSpentsByDateData } from "../../data/SpentData";
import { BoxCards } from "../../styled.Default";
import { Card } from "../Card";
import { AreaList, TextDate } from "./styled.ListDates";

interface Props {
    date: Date,
    onExportSpent: (spentModel: ISpent) => void,
}

export const ListDates = ({ date, onExportSpent }: Props) => {
    const [spents, setSpents] = useState<ISpent[]>([]);

    useEffect(() => {
        getSpents();
    }, [date]);

    const getSpents = async () => {
        await getSpentsByDateData(date).then(values => {
            setSpents(values as ISpent[])
        });
    }

    const prevEditSpent = (spentForEdit: ISpent) => {
        onExportSpent(spentForEdit);
    }

    return (
        <>
            <AreaList>
                <TextDate>{date.getDate() < 10 ? '0' + date.getDate() : date.getDate()} / {date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)} / {date.getFullYear()}</TextDate>
                <BoxCards>
                    {spents && spents.map((s: ISpent) => (
                        <Card onPressRemove={getSpents} onPressEdit={prevEditSpent} key={s.id} spent={s} />
                    ))}
                </BoxCards>
            </AreaList>
        </>
    );
}