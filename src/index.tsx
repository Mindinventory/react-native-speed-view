export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

import SpeedView from './SpeedView'
export default SpeedView;