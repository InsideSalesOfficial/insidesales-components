// Nifty helper functions to do some computed styles that are easily reused all the time
// similar to scss functions (http://sass-lang.com/documentation/Sass/Script/Functions.html)

// Public Functions =================================================================================================

/*
 * Takes a hex color value and an opacity and returns the transparent color in rgba value
 *
 * @param color   {string} a hex color value (e.g. '#ffffff')
 * @param opacity {number} a whole number between 1 and 100
 */
export function transparentize(color, opacity) {
  return _convertHex(color, opacity);
}

/*
 * Adds an elipsis to the end of text within a container that has a set width
 */
export function truncate() {
  return `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
}

// Private Functions =================================================================================================

/*
 * Takes a hex color value and an opacity and returns the transparent color in rgba value
 * NOTE: this function is _private
 *
 * @param color   {string} a hex color value (e.g. '#ffffff')
 * @param opacity {number} a whole number between 1 and 100
 */
function _convertHex(hex, opacity) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const result = `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  return result;
}
