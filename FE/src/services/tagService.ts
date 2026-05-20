export type TagDTO = {
  name: string;
};

export async function getTags(): Promise<TagDTO[]> {
  const res = await fetch("http://localhost:8080/tags");
  if (!res.ok) throw new Error("Failed to fetch tags");
  return res.json();
}

export async function createTag(name: string): Promise<TagDTO> {
  const res = await fetch("http://localhost:8080/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) throw new Error("Failed to create tag");
  return res.json();
}