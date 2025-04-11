function useDebounce(cb, delay ) {
    let timerId;
    return (...args) => {
        console.log("the args is",...args);
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            cb(...args);
        }, delay);
    }
  }
  
  export default useDebounce;
  