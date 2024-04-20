import { IDate } from '../types/IDate';
import { ISpent } from '../types/ISpent';
import { db } from './SQLiteDatabase';

const createSpentData = (obj: ISpent) => {
    obj.date.setHours(0, 0, 0.0, 0);
    return new Promise((resolve, reject) => {
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
                'SELECT DISTINCT date FROM spents;',
                [],
                (_, { rows }) => {
                    let dates = [];
                    let i;
                    const datesStr = rows._array;
                    for (i = 0; i < datesStr.length; i++) {
                        dates.push(new Date(datesStr[i].date));
                    }
                    resolve(dates);
                }
            );
        });
    });
}

const getSpentsByDateData = (date: Date) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM spents WHERE date = ?',
                [date.toISOString()],
                (_, { rows }) => {
                    const spents: ISpent[] = rows._array;
                    const spentswithDate = spents.map(spent => ({
                        ...spent,
                        date: new Date(spent.date)
                    }));

                    resolve(spentswithDate);
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
                    if (rowsAffected > 0) {
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

export { createSpentData, getSpentData, updateSpentData, removeSpentData, getDateSpentData, getSpentsByDateData }