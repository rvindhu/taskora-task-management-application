import { useEffect, useState } from 'react';
import { safeRead } from '../utils/taskUtils.js';
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => safeRead(key, initialValue));
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (error) { console.error(`Could not save ${key} to LocalStorage`, error); }
  }, [key, value]);
  return [value, setValue];
}
