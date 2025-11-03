export function debounce<F extends (...args: any[]) => void>(
  fn: F,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function pickHashedColor(id: string | number, colorArray: string[]) {
  const index =
    Math.abs(
      id
        .toString()
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0)
    ) % colorArray.length;
  return colorArray[index];
}
