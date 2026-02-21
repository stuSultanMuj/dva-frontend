export interface Company {
  id: string;
  name: string;
  initial: string;
  icon: string;
  color: string;
  gradient: [string, string];
}

export type ContextLevel = "green" | "lightgreen" | "yellow" | "orange" | "red";
