import fs from "node:fs";
import { parse } from "csv-parse";
import { CSV_PATH } from "../constants/csv-path.js";

const stream = fs.createReadStream(CSV_PATH);

export async function readCSV() {
  try {
    const parser = parse({
      delimiter: ",",
      fromLine: 2,
    });

    const lines = stream.pipe(parser);

    for await (const line of lines) {
      const [id, title, description, completed_at, created_at, updated_at] =
        line;

      await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          title,
          description,
          completed_at,
          created_at,
          updated_at,
        }),
      });
    }
  } catch {
    throw Error("Não foi possível recuperar os dados.");
  }
}
