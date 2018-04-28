const storage = localStorage // sessionStorage

export const saveItem = (key, value) => {
  try {
    value = JSON.stringify(value)
  } catch (error) {
    console.error(error)
  }
  storage.setItem(key, value)
}

export const getItem = (key, defaultValue) => {
  let result = storage.getItem(key)
  if (null === result) {
    result = defaultValue
  } else {
    try {
      result = JSON.parse(result)
    } catch (error) {
      console.error(error)
    }
  }
  return result
}

export const clearItems = () => {
  storage.clear()
}
