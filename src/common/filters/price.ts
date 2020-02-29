const price = (value: number, currency?: string) => {
  const isInteger = (num: number) => {
    return (num ^ 0) === num;
  }
  let result = isInteger(value) ? value : value.toFixed(2)
  if (currency) {
    result = `${result} ${currency}.`
  }
  return result
}

export {
  price
}
