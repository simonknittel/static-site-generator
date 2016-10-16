/**
 * Adds the .does-it-work--yes to .does-it-work
 * @method doesItWork
 */
export default function doesItWork() {
    const module = document.querySelector('.does-it-work');
    module.classList.add('does-it-work--yes');
    module.querySelector('.does-it-work__message span').innerHTML = 'It works!';
}
