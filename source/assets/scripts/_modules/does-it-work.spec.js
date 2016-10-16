import doesItWork from './does-it-work';

import pug from 'pug';

console.log(pug);

// const module = pug.renderFile('../../../_partials/modules/does-it-work.pug', {
//     doesItWork: {
//         heading: 'Static Site Generator',
//         icon: 'tick',
//         copy: 'Please report any feedback or issues to: <a href="https://github.com/simonknittel/static-site-generator/issues" target="_blank" rel="noopener">GitHub</a>',
//     },
// });

describe('Does it work?', () => {
    it('should add .does-it-work--yes to .does-it-work', () => {
        // doesItWork();
        // const contains = module.classList.contains('does-it-work--yes');

        let module = document.createElement('section');
        module.classList.add('does-it-work', 'does-it-work--yes');

        expect(module.classList.contains('does-it-work--yes')).toBe(true);
        // expect(module.querySelector('.does-it-work__message span').innerHTML).toBe('It works!');
    });
});
