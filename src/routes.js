import { Database } from "./datebase.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";
import { todayDate } from "./utils/today-date.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const {
        id: savedId,
        title,
        description,
        completed_at: savedCompletedDate,
        created_at: savedCreatedDate,
        updated_at: savedUpdatedDate,
      } = req.body;
      const task = {
        id: savedId ?? randomUUID(),
        title,
        description,
        completed_at: savedCompletedDate ?? null,
        created_at: savedCreatedDate ?? todayDate(),
        updated_at: savedUpdatedDate ?? todayDate(),
      };

      const error = database.insert("tasks", task);

      if (error) {
        const { errorType, errorMessage } = error;
        if (errorType == "not found")
          return res.writeHead(404).end(errorMessage);
        return res.writeHead(400).end(errorMessage);
      }

      return res.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      const error = database.update("tasks", id, {
        title,
        description,
      });

      if (error) {
        const { errorType, errorMessage } = error;
        if (errorType == "not found")
          return res.writeHead(404).end(errorMessage);
        return res.writeHead(400).end(errorMessage);
      }

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;
      const completed_at = todayDate();

      const error = database.update("tasks", id, { completed_at });

      if (error) {
        const { errorType, errorMessage } = error;
        if (errorType == "not found")
          return res.writeHead(404).end(errorMessage);
        return res.writeHead(400).end(errorMessage);
      }

      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const error = database.delete("tasks", id);

      if (error) {
        const { errorType, errorMessage } = error;
        if (errorType == "not found")
          return res.writeHead(404).end(errorMessage);
        return res.writeHead(400).end(errorMessage);
      }

      return res.writeHead(204).end();
    },
  },
];
