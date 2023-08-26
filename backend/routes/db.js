const sqlite3 = require('sqlite3').verbose();
const dbname = 'countries.sqlite3';
// 创建并连接一个数据库
const db = new sqlite3.Database(dbname)


// Articles API
class DB {
    //

    /**
     * Create a table with any fields
     *
     * @param {string} tableName The name of table
     * @param {Array} fields A Array of the fields String
     */
    static createTable(tableName, fields) {
        // 创建一个articles表
        db.serialize(() => {
            const sql = `
                                CREATE TABLE IF NOT EXISTS ${tableName} 
                                (id integer primary key, ${fields.join(',')})
                               `;
            // 如果没有articles表,创建一个
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
        // 使用sqlite3的all
        db.all(`SELECT * FROM ${tableName}`, resolve);
    }

    static deleteAllCountries(resolve) {
        DB.deleteAllDataFromTable('Countries', resolve);
    }

    static deleteAllDataFromTable(tableName, resolve) {
        db.run(`DELETE FROM ${tableName}`,resolve);
    }

    // // 根据id 获取文章
    // static find(id, cb) {
    //     // 使用sqlite3的get
    //     db.get('SELECT * FROM articles WHERE id = ?', id, cb);
    // }
    //
    // // 添加一个条文章记录
    // static create(data, cb) {
    //     const sql = `
    //             INSERT INTO
    //             articles(title,content)
    //             VALUES(?,?)
    //             ;select last_insert_rowid();`;
    //     db.run(sql, data.title, data.content, cb);
    // }
    //
    // // 删除一篇文章
    // static delete(id, cb) {
    //     if (!id) return cb(new Error(`缺少参数id`));
    //     db.run('DELETE FROM articles WHERE id=?', id, cb)
    // }
    //
    // // 更新一篇文章数据
    // static update(data, cb) {
    //     const sql = `
    //         UPDATE articles
    //         SET title=?,content=?
    //         WHERE id=?
    //     `
    //     db.run(sql, data.title, data.content, data.id, cb)
    // }
}


/**
 * Select All Document of Co
 */
// function selectAll(co, where={}) {
//     return new Promise(resolve => {
//
//         MongoClient.connect(url, { useUnifiedTopology: true },(err, con)=>{
//             let db = con.db(dbName);
//             db.collection(co).find(where).toArray((err, data)=>{
//                 con.close();
//                 resolve(data);
//             });
//         });
//
//
//
//
//     });
// }

module.exports.DB = DB;
