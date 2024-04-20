import * as SQLite from 'expo-sqlite';

// const db = SQLite.openDatabase("carteira_viagem.db");
const db = SQLite.openDatabase("carteira_viagem_02.db");
// const db = SQLite.openDatabase("carteira_viagem_03.db");

const initializeDatabase = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS spents (id INTEGER PRIMARY KEY AUTOINCREMENT, desc TEXT, value NUMERIC(10, 2), date TEXT);',
            // 'DROP TABLE spents;',
            [],
            () => console.log('[SQLite] spent criado no banco de dados')
        );
    });
};

export { db, initializeDatabase }