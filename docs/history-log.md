[**← Go Back**](../)

---

# History Log

## App Checklist
* [ ] issue: find way to receive error message
    - [**Ln. 52 →**](../middleware/validates.js)

* [ ] issue: need NPM script to access env file
    - e.g: `NODE_ENV=development`
    - [**Ln. 1 →**](../config/knexfile.js)
    
* [x] issue: fix `validation.js` test file
    - apply for `validates.js` middleware
    - [**File →**](../test/validation.js)

* [x] security: check for npm, safe inputs
    - remove any potential injection attacks
    - [**File →**](../client/src/App.js)

* [x] add: apply `jsonSchema` for DB model
    - [**Ln. 9 →**](../models/Link.js)

* [x] add: create URL data for DB (insert)
    - [**Ln. 37 →**](../controllers/url-controller.js)

* [x] add: update click event for clicked links
    - increment counts 1+
    - apply update for Link DB, `count++`
    - [**File →**](../client/src/App.js)

* [x] temp: apply a `json data template` for React Page
    - map & append to VDOM
    - [**File →**](../client/src/assets/data-temp.json)

* [x] check: priority, run & view all updates
    - [**IMPORTANT →**](../package.json)

* [x] add: apply tooltip style for `show link` button
    - [**Ln. 78 →**](../client/src/App.js)

* [x] add: find npm to copy to clipboard for `copy link` button
    - [**Ln. 82 →**](../client/src/App.js)

* [x] refactor: create components for React `App.js` file
    - use `useContext` hook, API folder, 
    - use `useImmerReducer` for API display all
    - [**File →**](../client/src/App.js)

* [x] workaround: redirect page during development

* [ ] style: make responsive `<table>` CSS

* [ ] style: hero section `<form>` CSS

---

[**← Go Back**](../)