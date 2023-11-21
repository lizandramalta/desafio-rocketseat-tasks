import fs from "node:fs";
import { CSV_PATH } from "../constants/csv-path.js";

export function writeCSV(tasks) {
  try {
    const taksStream = fs.createWriteStream(CSV_PATH);
    taksStream.write("title,description\n");

    tasks.forEach((task) => {
      const { title, description } = task;
      taksStream.write(`${title},${description}\n`);
    });
  } catch {
    throw Error("Não foi possível atualizar o arquivo tasks.");
  }
}
