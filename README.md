This is a prototype of PSF's UI.

## Table of Contents

- [Features](#features)
- [Try prototype](#try-prototype)
- [Modify prototype](#modify-prototype)

## Features

* Load local data (default)
* Load data from url
* Display projects and quotes
* Open modals for more info

This app was created via [`create-react-app`](https://github.com/facebook/create-react-app/).

## Try prototype

* Hosted on [GitHub Pages](https://geoffhom.github.io/psf/)

## Modify prototype

You can download the code, run it on your machine, then edit as you see fit:

* [Clone the repository](https://help.github.com/articles/cloning-a-repository/) onto your computer.
  * This should create the directory `psf`.
* Using the command line, go to the `psf` directory (e.g., `cd psf`).
* Install the necessary packages by running `npm install`.
  * This may take a full minute and will install several thousand packages under `node_modules`.
  * If you don't have npm, try [the official site](https://www.npmjs.com/).
* Run `npm start`.
  * This should automatically open a browser tab at something like http://computer-name.local:3000/.
  * The PSF prototype should appear!
* To edit the sourcecode, use your favorite editor/IDE.
  * I used [Atom](https://atom.io/).
* As the prototype used `create-react-app`, check out [its User Guide](https://github.com/facebook/create-react-app/) for helpful info.

### Load data

* By default, local data is used (`localTesting.js`).
* To load remote data:
  * In `App.js`, set `testLocal = false`.
  * The default remote data is from [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/users/1).
  * To change the remote URL, look in `App.js` for `const url`.
