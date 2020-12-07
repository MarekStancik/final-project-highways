export type RouteStatus = "empty" | "normal" | "full" | "jammed";

export interface Route {
  id: string;
  from: string;
  to: string;
  name: string;
  length: number;
  avgTime: number;
  status: RouteStatus;
}
