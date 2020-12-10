import { DatabaseObject } from "./db-object.model";

export type RouteStatus = "empty" | "normal" | "full" | "jammed";

export interface Route extends DatabaseObject{
  start: string;
  end: string;
  name: string;
  length: number;
  avgTime: number;
  status: RouteStatus;
}
