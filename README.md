# Modal

[![Build Status](https://travis-ci.org/stephan281094/modal.svg)](https://travis-ci.org/stephan281094/modal)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
![Awesomeness over 9000!](https://img.shields.io/badge/awesomeness-over%209000!-blue.svg)

A simple dependency-free JavaScript modal

## Demo
Click the following link to see the modal in action: [demo](https://stephan281094.github.io/modal).

## How
* Include `modal.css` and `modal.js`
* Create a wrapper node with a class: `.modal-wrapper`
* Add modals containing `data-modal="somename"` inside the wrapper
* Open the modal by clicking any `data-modaltrigger="somename"`
* Or simply call the open function: `modal.open('awesome')`

## Developing
* Run `npm run dev` to run webpack and watch for changes

## License
This project was created by [Stephan](https://github.com/stephan281094) and released under [MIT](LICENSE).
