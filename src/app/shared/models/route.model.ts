export type RouteStatus = "empty" | "normal" | "full" | "jammed";

export interface Route {
  id: string;
  start: string;
  end: string;
  name: string;
  length: number;
  avgTime: number;
  status: RouteStatus;
}
