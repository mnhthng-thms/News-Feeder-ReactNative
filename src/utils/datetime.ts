const getDate = (x: Datetime) => {
  const t = new Date(x)
  const _pad = (x: number) => x < 10 ? `0${x}` : `${x}`
  
  return `${_pad(t.getDate())}/${_pad(t.getMonth())}/${t.getFullYear()}`
}

export {
  getDate
}