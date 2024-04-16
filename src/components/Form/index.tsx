import { Button, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { AreaCalendar, AreaForm, GroupForm, InptText, TextDate } from "./styled.Form";
import { useEffect, useState } from "react";
import { createSpentData, updateSpentData } from "../../data/SpentData";
import { ISpent } from "../../types/ISpent";
import { TextInputMask } from 'react-native-masked-text';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Ionicons } from "@expo/vector-icons";

interface Props {
    onPressCreate: () => void,
    spentForEdit?: ISpent
}

export const Form = ({ onPressCreate, spentForEdit }: Props) => {
    const [desc, setDesc] = useState<string>();
    const [valueInput, setValueInput] = useState<string>('0');
    const [valueAmount, setValueAmount] = useState<number>();
    const [datePicker, setDatePicker] = useState(new Date());
    const [isEdit, setIsEdit] = useState(false);
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        if (spentForEdit) {
            setDesc(spentForEdit?.desc);
            setValueAmount(spentForEdit?.value);
            setValueInput(String(spentForEdit?.value));
            setIsEdit(true);
        }
    }, [spentForEdit]);

    const onHandleForm = async () => {
        if (desc && valueAmount) {
            if (!isEdit) {
                await createSpentData({ desc, value: valueAmount, date: datePicker })
                .then(id => {
                        console.log(`[SQLite] Gasto de número ${id} criado`);
                        setDesc(undefined);
                        setValueAmount(undefined);
                        setValueInput('0');
                    })
                    .catch(err => console.log(`[SQLite] erro: ${err}`));
            } else {
                if (spentForEdit) {
                    console.log(spentForEdit.id);
                    console.log(desc, valueAmount);
                    await updateSpentData({ id: spentForEdit.id, desc: desc, value: valueAmount, date: new Date() })
                        .then(updated => {
                            console.log(`[SQLite] ${updated} atualizado com sucesso`)
                            setDesc(undefined);
                            setValueAmount(undefined);
                            setValueInput('0');
                        })
                        .catch(err => console.log(`[SQLite] erro: ${err}`));
                    setIsEdit(false);
                    spentForEdit = undefined;
                }
            }
            onPressCreate();
        } else {
            console.log(`[INTERNAL] Ausência nos campos Descrição e Valor`);
        }
    }

    const toggleDatepicker = () => {
        setShowPicker(!showPicker);
    }

    return (
        <AreaForm>
            <GroupForm>
                <InptText isText placeholder="Descrição do gasto" value={desc} onChangeText={t => setDesc(t)} />
                <TextInputMask style={Styles.inpt} type={'money'} value={valueInput} onChangeText={t => {
                    setValueInput(t);
                    t = t.replace('R$', '');
                    t = t.replace('.', '');
                    t = t.replace(',', '.');
                    setValueAmount(Number(t));
                }} />
            </GroupForm>
            <GroupForm>
                <AreaCalendar onPress={toggleDatepicker} >
                    <TextDate> 
                        { datePicker && `${datePicker.getDate() < 10 ? '0'+datePicker.getDate() : datePicker.getDate()} / ${datePicker.getMonth() < 10 ? '0'+datePicker.getMonth() : datePicker.getMonth()} / ${datePicker.getFullYear()}`} 
                    </TextDate>
                    <Ionicons name="calendar-outline" size={25} color="blue" />
                </AreaCalendar>
                {showPicker && <DateTimePicker mode="date" display="spinner" value={datePicker} onChange={(type: any, selectedData: any) => {
                    if(type.type === "set"){
                        setDatePicker(new Date(selectedData));
                    }else{
                        toggleDatepicker();
                    }
                }} />}
                <Button onPress={() => onHandleForm()} title="Salvar" />
            </GroupForm>
        </AreaForm>
    );
}

const Styles = StyleSheet.create({
    inpt: {
        borderBottomWidth: .5,
        width: '20%'
    }
});