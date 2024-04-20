import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, ScrollView } from 'react-native';
import { Title } from './src/components/Title';
import { ContainerPage, ContentPage } from './src/styled.Default';
import { Form } from './src/components/Form';
import { useEffect, useState } from 'react';
import { getDateSpentData } from './src/data/SpentData';
import { initializeDatabase } from './src/data/SQLiteDatabase';
import { ListDates } from './src/components/ListDates';
import { ISpent } from './src/types/ISpent';

export default function App() {
  const [datesList, setDatesList] = useState<Date[]>();
  const [spentModel, setSpentModel] = useState<ISpent>();

  useEffect(() => {
    initializeDatabase();
    getDates();
  }, []);

  const getDates = async () => {
    await getDateSpentData().then(values => {
      if(Number.isNaN(values)){
        console.log("putz");
      }
      setDatesList(values as Date[]);
      console.log(values);
    });
  }

  return (
    <ContainerPage>
      <ContentPage>
        <Title text='Gastos' />
        <Form spentForEdit={spentModel} onTaskCompleted={getDates} />
        <ScrollView>
          <SafeAreaView>
            {datesList && datesList.map((d: Date, index) => (
              <ListDates key={index} onExportSpent={(s: ISpent) => setSpentModel(s)} date={d} />
            ))}
          </SafeAreaView>
        </ScrollView>
      </ContentPage>
      <StatusBar style='auto' />
    </ContainerPage>
  );
}
