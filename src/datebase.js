import { readCSV } from "./utils/read-csv.js";
import { todayDate } from "./utils/today-date.js";
import { writeCSV } from "./utils/write-csv.js";

export class Database {
  #database = {};

  constructor() {
    readCSV()
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        writeCSV([]);
      });
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          if (!value) return true;

          return row[key].includes(value);
        });
      });
    }

    return data;
  }

  insert(table, data) {
    if (!data.title || !data.description)
      return {
        errorType: "required fields",
        errorMessage:
          "Não foi possível criar a tasks, verifique se os campos title e description foram preenchidos.",
      };
    if (Array.isArray(this.#database[table])) this.#database[table].push(data);
    else this.#database[table] = [data];
    writeCSV(this.#database[table]);
  }

  update(table, id, newData) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex == -1)
      return {
        errorType: "not found",
        errorMessage: "O registro não existe no banco de dados.",
      };

    const data = this.#database[table][rowIndex];

    if (!newData.title || !newData.description)
      return {
        errorType: "required fields",
        errorMessage:
          "Não foi possível atualizar a tasks, verifique se os campos title e description foram preenchidos.",
      };

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

    if (rowIndex == -1)
      return {
        errorType: "not found",
        errorMessage: "O registro não existe no banco de dados.",
      };

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      writeCSV(this.#database[table]);
    }
  }
}
