import doesItWork from './_modules/does-it-work'


const doesItWorkMessage: Element = document.querySelector('.does-it-work__message')
if (doesItWorkMessage) {
  const result = doesItWork()

  const bemVariant = result ? 'success' : 'failure'
  doesItWorkMessage.classList.add(`does-it-work__message--${bemVariant}`)
  document.querySelector('.does-it-work__message span').innerHTML = result ? 'It works!' : 'Something failed!'
}
