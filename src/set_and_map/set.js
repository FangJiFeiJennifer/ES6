/**
 * Created by Jennifer on 2017/3/6.
 */
function arrayToSet(array) {
  if(Array.isArray(array)) {
    let set = new Set();
    array.forEach(value => set.add(value));
    return set;
  }else {
    return null;
  }
}

export {
  arrayToSet
}

