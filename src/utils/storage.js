const Storage = {};

Storage.setValue = (key, value) => {
   localStorage.setItem(key, JSON.stringify(value));
}

Storage.getValue = (key) => {
   const val = localStorage.getItem(key);
   return val && JSON.parse(val);
}

Storage.removeValue = (key) => {
   localStorage.removeItem(key);
}

export default Storage;