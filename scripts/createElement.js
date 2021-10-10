//args class you want to assign div + image src + alt + monName
function createElement(
  elType,
  elClass,
  pOrSpanElArg,
  imageSrc,
  altText,
  monName = '',
  addButton = false
) {
  const newDivEl = document.createElement(elType);
  const imageEl = document.createElement('img');
  const pOrSpanEl = document.createElement(pOrSpanElArg);
  newDivEl.setAttribute('class', elClass);
  pOrSpanEl.textContent = monName;

  Object.assign(imageEl, {
    src: imageSrc,
    alt: altText,
  });

  newDivEl.append(imageEl, pOrSpanEl);

  if (addButton) {
    const newButton = document.createElement('button');
    newButton.textContent = 'X';
    newButton.setAttribute('class', 'team-aside-button');
    newButton.addEventListener('click', (event) => {
      event.preventDefault();
      // console.log(event.target.parentNode);
      event.target.parentNode.remove();
    });
    newDivEl.append(newButton);
    // console.log(newButton.parentNode);
  }
  return newDivEl;
}
