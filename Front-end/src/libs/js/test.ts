console.log('Test');
const templ = Array.from(document.getElementsByTagName('template'));
const keys = templ.map((t) => t.id);
const htmlTempl = templ.map(
  (t) => document.importNode(t.content, true).firstElementChild!
);

//Merge two arrays into object
// const templates = keys.reduce(
//   (acc, key, ind) => ({ ...acc, [key]: htmlTempl[ind] }),
//   {}
// );
let templates = {};
keys.forEach(
  (key, ind) => (templates = { ...templates, [key]: htmlTempl[ind] })
);
console.log(templates);
