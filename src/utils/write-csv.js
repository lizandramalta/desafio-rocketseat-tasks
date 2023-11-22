import fs from "node:fs";
import { CSV_PATH } from "../constants/csv-path.js";

export function writeCSV(tasks) {
  try {
    const taksStream = fs.createWriteStream(CSV_PATH);
    taksStream.write(
      "id,title,description,completed_at,created_at,updated_at\n"
    );

    tasks.forEach((task) => {
      const { id, title, description, completed_at, created_at, updated_at } =
        task;
      taksStream.write(
        `${id},${title},${description},${completed_at},${created_at},${updated_at}\n`
      );
    });
  } catch {
    throw Error("Não foi possível atualizar o arquivo tasks.");
  }
}
