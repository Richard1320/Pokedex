export function fileExists(url, callback) {
  if (!url) return false;

  var http = new XMLHttpRequest();
  http.open('HEAD', url);
  http.onreadystatechange = function() {
    if (this.readyState === this.DONE) {
      if (this.status !== 404) {
        callback();
      }
    }
  };
  http.send();
}
export function fileFetchData(url, callback) {
  if (!url) return;

  let oReq = new XMLHttpRequest();

  oReq.addEventListener('load', function() {
    try {
      var json = JSON.parse(this.responseText);
      callback(json);
    } catch (err) {
      console.error(err.message);
      return false;
    }
  });
  oReq.open('GET', url);
  oReq.send();
}
export function normalizeName(name) {
  if (!name) return;

  if (typeof name !== 'string') return name;

  // Replace hyphens with spaces
  name = name.replace('-', ' ');

  // Replace underscores with spaces
  name = name.replace('_', ' ');

  // Capitalize first letter of every word
  name = name
    // .toLowerCase()
    .split(' ')
    .map(function(word) {
      // console.log("First capital letter: "+word[0]);
      // console.log("remain letters: "+ word.substr(1));
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');

  return name;
}
