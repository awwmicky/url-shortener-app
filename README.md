# URL Shortener App

## App Checklist
* [x] issue: fix `validation.js` test file
    - apply for `validates.js` middleware
    - [**File →**](/test/validation.js)

* [] issue: find way to receive error messge
    - [**Ln. 52 →**](/middleware/validates.js)

* [ ] security: check for npm, safe inputs
    - remove any potential injection attacks
    - [**File →**](/client/src/App.js)

* [ ] add: apply `jsonSchema` for DB model
    - [**Ln. 9 →**](/models/Link.js)

* [ ] add: create URL data for DB (insert)
    - [**Ln. 37 →**](/controllers/url-controller.js)

* [ ] add: create click event for clicked links
    - apply update for Link DB, `count++`
    - [**File →**](/client/src/App.js)

* [x] temp: apply a `json data template` for React Page
    - map & append to VDOM
    - [**File →**](/client/src/assets/data-temp.json)