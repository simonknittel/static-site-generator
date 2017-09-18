import doesItWork from './_modules/does-it-work'


const doesItWorkMessage: HTMLElement = <HTMLElement> document.querySelector('.does-it-work__message')
if (doesItWorkMessage) {
  const result = doesItWork()

  doesItWorkMessage.classList.add('does-it-work__message--' + (result ? 'success' : 'failure'))
  document.querySelector('.does-it-work__message span').innerHTML = result ? 'It works!' : 'Something failed!'
}
