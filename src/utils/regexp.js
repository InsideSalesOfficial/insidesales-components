const singleCharacter = /^([^\x00-\x7F]|[^\u0000-\u007F]|[\w-_]){1}$/;
const whitespace = /\s/g;

export {
  singleCharacter,
  whitespace,
}