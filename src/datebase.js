import { todayDate } from "./utils/today-data.js";

export class Database {
  #database = {};

  select(table) {
    return this.#database[table] ?? [];
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) this.#database[table].push(data);
    else this.#database[table] = [data];
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    const { completed_at, created_at } = this.#database[table][rowIndex];

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {
        id,
        ...data,
        completed_at,
        created_at,
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
