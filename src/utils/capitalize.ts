export default function capitalize(word: string) {
  const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
  return capitalized;
}
