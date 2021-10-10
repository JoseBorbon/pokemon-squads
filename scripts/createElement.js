//args class you want to assign div + image src + alt + monName
function createElement(
  elType,
  elClass,
  pOrSpanElArg,
  imageSrc,
  altText,
  monName = ''
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
  return newDivEl;
}
