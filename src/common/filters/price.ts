export function price(value: number) {
  const isInteger = (num: number) => {
    return (num ^ 0) === num;
  }
  return isInteger(value) ? value : value.toFixed(2)
}
