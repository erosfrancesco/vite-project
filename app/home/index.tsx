import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Shiatsu Journal" },
    { name: "description", content: "Shiatsu journal keeper." },
  ];
}

// TODO: - Treatment Screen
export default function Home() {
  return <div />;
}
