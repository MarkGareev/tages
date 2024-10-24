export function addToLocalStorage(key: string, id: string): void {
  const arr: string[] = JSON.parse(localStorage.getItem(key) || "[]");
  arr.push(id);
  localStorage.setItem(key, JSON.stringify(arr));
}
export function removeFromLocalStorage(key: string, id: string): void {
  const arr: string[] = JSON.parse(localStorage.getItem(key) || "[]");
  arr.splice(arr.indexOf(id), 1);
  localStorage.setItem(key, JSON.stringify(arr));
}
