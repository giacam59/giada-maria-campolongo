import { useEffect } from 'react';

let locks = 0;
let previousOverflow = '';

/** Reference counting lets a dialog and mobile menu safely overlap. */
export function useBodyLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    if (locks++ === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    return () => {
      if (--locks === 0) document.body.style.overflow = previousOverflow;
    };
  }, [active]);
}
