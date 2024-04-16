import { ISpent } from '../types/ISpent';
import { db } from './SQLiteDatabase';

const createSpentData = (obj: ISpent) => {
    return new Promise ((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO spents (desc, value, date) VALUES (?, ?, ?);',
                [obj.desc, obj.value, obj.date.toISOString()],
                (_, { rowsAffected, insertId }) => {
                    if (rowsAffected > 0) resolve(insertId);
                    else reject(new Error('Erro ao inserir item ' + JSON.stringify(obj)));
                },
            );
        });
    });
}

const getSpentData = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM spents;',
                [],
                (_, { rows }) => {
                    const spents: ISpent[] = rows._array;
                    const spentswithDate = spents.map(spent => ({
                        ...spent,
                        date: new Date(spent.date)
                    }));

                    resolve(spentswithDate);
                }
            );
        })
    });
}

const getDateSpentData = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT date FROM spents;',
                [],
                (_, { rows }) => {
                    const datesStr: string[] = rows._array.map(row => row.date);
                    const realDates = datesStr.map(date => new Date(date));
                    resolve(realDates);
                }
            );
        });
    });
}

const updateSpentData = (obj: ISpent) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE spents SET desc=?, value=? WHERE id = ?;",
                [obj.desc, obj.value, obj.id ? obj.id : 0],
                (_, { rowsAffected }) => {
                    if( rowsAffected > 0 ) {
                        resolve(rowsAffected);
                    }
                    else reject("[SQLite]  Erro ao atualizar");
                }
            );
        });
    });
}

const removeSpentData = (id: number) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM spents WHERE id=?;",
                [id],
                (_, rowsAffected) => {
                    resolve(rowsAffected);
                },
            );
        });
    });
}

export { createSpentData, getSpentData, updateSpentData, removeSpentData, getDateSpentData }