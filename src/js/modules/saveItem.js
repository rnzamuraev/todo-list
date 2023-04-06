export default function saveItem(key, name) {
  localStorage.setItem(key, JSON.stringify(name));
}
