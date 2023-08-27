const sqlite3 = require('sqlite3').verbose();
const dbname = 'countries.sqlite3';
// 创建并连接一个数据库
const db = new sqlite3.Database(dbname)

class DB {
    //

    /**
     * Create a table with any fields
     *
     * @param {string} tableName The name of table
     * @param {Array} fields A Array of the fields String
     *
     * @author Sean
     * @date 24-08-2023
     */
    static createTable(tableName, fields) {
        db.serialize(() => {
            const sql = `
                                CREATE TABLE IF NOT EXISTS ${tableName} 
                                (id integer primary key, ${fields.join(',')})
                               `;
            db.run(sql);
        });

    }

    static insertCountry(countryName, resolve) {
        DB.insert('Countries', ['name'], [countryName], resolve);
    }

    /**
     * Insert base function, insert any fields and any values to any table
     *
     * @param {string} tableName The name of table
     * @param {Array} fields A Array of the fields String
     * @param {Array} values Array of the values of fields, it should match the fields Array param
     * @param {Object} resolve A Function about how to process the data
     *
     * @author Sean
     * @date 24-08-2023
     */
    static insert(tableName, fields, values, resolve){
        const sql = `
                INSERT INTO 
                ${tableName}(${fields.join(',')}) 
                VALUES(${'"'+values.join('","')+'"'}) 
                ;select last_insert_rowid();`;
        // return sql;
        db.run(sql, resolve);
    }

    /**
     * Select All data from a table
     *
     * @param {string} tableName The name of table
     * @param {Object} resolve A Function about how to process the data
     *
     * @author Sean
     * @date 24-08-2023
     */
    static selectAllCountries(resolve) {
        DB.select('Countries', resolve);
    }

    static findCountriesByName(searchName, resolve) {
        db.get(`SELECT * FROM Countries WHERE name LIKE '%${searchName}%'`, resolve);
    }

    /**
     * Select All data from a table
     *
     * @param {string} tableName The name of table
     * @param {Object} resolve A Function about how to process the data
     */
    static select(tableName, resolve) {
        db.all(`SELECT * FROM ${tableName}`, resolve);
    }

    static deleteAllCountries(resolve) {
        DB.deleteAllDataFromTable('Countries', resolve);
    }

    static deleteAllDataFromTable(tableName, resolve) {
        db.run(`DELETE FROM ${tableName}`,resolve);
    }

}

DB.createTable('Countries', ['name']);
module.exports.DB = DB;
