const header = document.querySelector('header');

function addStyles(element, styles) {
   Object.keys(styles).forEach((styleKey) => {
      element.style[styleKey] = styles[styleKey];
   });
}

function handler() {
   const colors = Array.from(
      document.querySelector('.colors-collection.widget').children
   );
   const percentShade = parseFloat(
      document.querySelector('.mdc-text-field__input[type="number"]').value
   );
   const start = percentShade * 20 - percentShade;

   const out = [];

   for (let i = 0; i < colors.length; ++i) {
      const color = colors[i];

      const info = color.children[0];
      const hex = info.querySelector('.hex--label').textContent;
      const percentParent = info.children[0];
      const percent =
         percentParent.querySelector('.percentage--label').textContent;
      const percentNum = parseInt(percent.replace(/%/g, ''));

      if (percentNum > start) continue;

      out.push(hex);
      if (percentNum === 0) break;
   }

   navigator.clipboard.writeText(
      JSON.stringify(
         Object.fromEntries(
            out.map((hex, hexIndex) => ['bg-brand-' + (hexIndex + 1) * 50, hex])
         )
      )
   );
}

const button = document.createElement('button');
addStyles(button, {
   marginRight: '0.25rem',
   cursor: 'pointer',
   opacity: '95%',
   backgroundColor: '#06B6D4',
   padding: '0.5rem 1rem',
   borderRadius: '1.5rem',
   border: '1px solid #06B6D4',
   fontWeight: '600',
   fontFamily: '"Roboto Mono", monospace',
   letterSpacing: '-0.025em',
   boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
});
button.textContent = 'Tailwind';
button.onclick = handler;
header.insertBefore(button, document.querySelector('.header__random-btn'));
