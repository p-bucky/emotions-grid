function findGreatestValueKey(obj) {
  let greatestValue = -Infinity;
  let greatestKey = null;

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === "number") {
      if (obj[key] > greatestValue) {
        greatestValue = obj[key];
        greatestKey = key;
      }
    }
  }

  return greatestKey;
}
