import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mercedes Paz" },
    { name: "description", content: "My personal website" },
  ];
}

export default function Home() {
  const now = new Date().toISOString();

  if (typeof window === "undefined") {
    console.log("server render at ", now);
  } else {
    console.log("cliente hydration at ", now);
  }

  return <section>My app</section>;
}
