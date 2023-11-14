import { todayDate } from "./utils/today-date.js";

export class Database {
  #database = {};

  select(table) {
    return this.#database[table] ?? [];
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) this.#database[table].push(data);
    else this.#database[table] = [data];
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
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
    }
  }
}
