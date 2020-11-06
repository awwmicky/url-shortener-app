# URL Shortener App

## Setup & Install
1. **Requirements**
    - `Node` / `NPM` / `Postgres`
2. **Clone Repo**
```bash
HTTPS
  $ git clone https://github.com/awwmicky/url-shortener-app.git

SSH
  $ git clone git@github.com:awwmicky/url-shortener-app.git

GitHub CLI
  $ gh repo clone awwmicky/url-shortener-app
```
3. **Add NPM Packages**
    - `npm install`
    - …will take some time…
4. **Create `.env` File**
    - add postres admin credentials
    - connects to the client DB
```env
DB_HOST_LOCAL = [ add localhost ]
DB_USER_LOCAL = [ add username  ]
DB_PASS_LOCAL = [ add password  ]
DB_NAME_LOCAL = [ add database  ]
```
5. **Migrate & Seed Data**
    - `npm run db`
6. **DONE! → Run Web App**
    - `npm run dev`

## Tech Tools
- DB: `Postres` / `KnexJS` / `ObjectionJS (ORM)`
- Front-End: `React (Hooks)` / `Sass`
- Back-End: `Node` / `Express`
    - url tools: `nanoid` / `url-parse` / `yup`
    - protection: `helmet` / `cors`
- General: `Axios`

## App Checklist
* [ ] issue: find way to receive error message
    - [**Ln. 52 →**](/middleware/validates.js)

* [ ] issue: need NPM script to access env file
    - e.g: `NODE_ENV=development`
    - [**Ln. 1 →**](/config/knexfile.js)
    
* [x] issue: fix `validation.js` test file
    - apply for `validates.js` middleware
    - [**File →**](/test/validation.js)

* [x] security: check for npm, safe inputs
    - remove any potential injection attacks
    - [**File →**](/client/src/App.js)

* [x] add: apply `jsonSchema` for DB model
    - [**Ln. 9 →**](/models/Link.js)

* [x] add: create URL data for DB (insert)
    - [**Ln. 37 →**](/controllers/url-controller.js)

* [x] add: update click event for clicked links
    - increment counts 1+
    - apply update for Link DB, `count++`
    - [**File →**](/client/src/App.js)

* [x] temp: apply a `json data template` for React Page
    - map & append to VDOM
    - [**File →**](/client/src/assets/data-temp.json)

* [x] check: priority, run & view all updates
    - [**IMPORTANT →**](/package.json)

* [ ] add: apply tooltip style for `show link` button
    - [**Ln. 78 →**](/client/src/App.js)

* [ ] add: find npm to copy to clipboard for `copy link` button
    - [**Ln. 82 →**](/client/src/App.js)

* [x] refactor: create components for React `App.js` file
    - use `useContext` hook, API folder, 
    - use `useImmerReducer` for API display all
    - [**File →**](/client/src/App.js)