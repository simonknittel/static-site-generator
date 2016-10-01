import doesItWork from './_modules/does-it-work';

const doesItWorkMessage = document.querySelector('.does-it-work__message');
if (doesItWorkMessage) {
    if (doesItWork() === true) {
        doesItWorkMessage.classList.add('does-it-work__message--success');
        document.querySelector('.does-it-work__message span').innerHTML = 'It works!';
    } else {
        doesItWorkMessage.classList.add('does-it-work__message--failure');
        document.querySelector('.does-it-work__message span').innerHTML = 'Something failed!';
    }
}
