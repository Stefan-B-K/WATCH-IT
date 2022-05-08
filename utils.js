
export default (callback, delay = 1000) => {
  let timeoutID
  return (...args) => {                                 
    if (timeoutID) clearTimeout(timeoutID)
    timeoutID = setTimeout( () => { 
      callback.apply(null, args) 
    }, delay)
  }
}