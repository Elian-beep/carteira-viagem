import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import { Title } from './src/components/Title';
import { BoxCards, ContainerPage, ContentPage } from './src/styled.Default';
import { Form } from './src/components/Form';
import { ISpent } from './src/types/ISpent';
import { useEffect, useState } from 'react';
import { getDateSpentData, getSpentData } from './src/data/SpentData';
import { initializeDatabase } from './src/data/SQLiteDatabase';
import { Card } from './src/components/Card';

export default function App() {
  const [spents, setSpents] = useState<ISpent[] | unknown | any>([]);
  const [spentModel, setSpentModel] = useState<ISpent>();

  useEffect(() => {
    initializeDatabase();
    getSpents();
    getDatesSpent();
  }, []);

  const getSpents = async () => {
    await getSpentData().then((values) => {
      setSpents(values)
    });
  }

  const getDatesSpent = async () => {
    await getDateSpentData().then(values => {
      console.log(values);
    });
  }

  const prevEditSpent = (spentForEdit: ISpent) => {
    setSpentModel(spentForEdit);
  }


  return (
    <ContainerPage>
      <ContentPage>
        <Title text='Gastos' />
        <Form spentForEdit={spentModel} onPressCreate={getSpents} />
        <ScrollView>
          <BoxCards>
            {spents && spents.map((s: ISpent) => (
              <Card onPressRemove={getSpents} onPressEdit={prevEditSpent} key={s.id} spent={s} />
            ))}
          </BoxCards>
        </ScrollView>
      </ContentPage>
      <StatusBar style='auto' />
    </ContainerPage>
  );
}
