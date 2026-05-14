export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

//storage helper
export const load = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const save = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};