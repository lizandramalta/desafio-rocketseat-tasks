import { Database } from "./datebase.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";
import { todayDate } from "./utils/today-data.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (_, res) => {
      const tasks = database.select("tasks");

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: todayDate(),
        updated_at: todayDate(),
      };

      database.insert("tasks", task);

      return res.writeHead(201).end();
    },
  },
];
