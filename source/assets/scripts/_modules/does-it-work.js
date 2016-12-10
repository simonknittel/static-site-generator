/**
 * Returns either true (default) or a custom boolean
 * @method doesItWork
 * @param {boolean} manual Custom boolean to return
 * @return {string} Returns true or false
 */
export default function doesItWork(manual) {
    return manual || true;
}
