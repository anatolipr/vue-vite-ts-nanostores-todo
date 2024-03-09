/**
 * get epoch seconds
 * @returns current epoch seconds
 */
export function getCurrentEpoch(): number {
    return new Date().getTime() / 1000;
}