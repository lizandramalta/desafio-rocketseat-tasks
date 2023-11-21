import { todayDate } from "./utils/today-date.js";
import { writeCSV } from "./utils/write-csv.js";

export class Database {
  #database = {};

  select(table) {
    return this.#database[table] ?? [];
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) this.#database[table].push(data);
    else this.#database[table] = [data];
    writeCSV(this.#database[table]);
  }

  update(table, id, newData) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    const data = this.#database[table][rowIndex];

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {
        ...data,
        ...newData,
        updated_at: todayDate(),
      };
      writeCSV(this.#database[table]);
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      writeCSV(this.#database[table]);
    }
  }
}
