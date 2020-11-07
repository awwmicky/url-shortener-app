# URL Shortener App

> ### status: **Not Deployed**

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
    - …it will take some time…
4. **Create `.env` File**
    - add postres admin credentials
    - this connects to the client DB
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

## Tech Tools Used
- **Front-End**: `React (Hooks)` / `Sass`
    - http request: `Axios`
- **Back-End**: `Node` / `Express`
    - url tools: `nanoid` / `url-parse` / `yup`
    - protection: `helmet` / `cors`
- **Database**: `Postres` / `KnexJS` / `ObjectionJS (ORM)`

---

[check out my app checklist →](/docs/history-log.md)