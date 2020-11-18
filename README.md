# URL Shortener App

> ### status: **Not Deployed**

The idea to have your own library of short/custom url links, helps with sending them quick & making it easy to read.
The goal to is to personalize the links, track the number of clicks, & set the "time ago" it was published.
The tech. tools I used to create this web app are React, Sass, Node, Express, & PostgreSQL.

## Setup & Install
1. **Requirements**
    - `Node` / `NPM` / `PostgreSQL`
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
    - add Postres admin credentials
    - this connects to the client DB
```env
DB_HOST_LOCAL = [ add localhost ]
DB_USER_LOCAL = [ add username  ]
DB_PASS_LOCAL = [ add password  ]
DB_NAME_LOCAL = [ add database  ]
```
5. **Migrate & Seed Data**
    - `npm run db`
6. **DONE! → Run Server**
    - `npm run dev`

## Tech Tools Used
- **Front-End**: `React (Hooks)` / `Sass`
    - http request: `Axios`
- **Back-End**: `Node` / `Express`
    - url tools: `nanoid` / `url-parse` / `yup`
    - protection: `helmet` / `cors`
- **Database**: `PostreSQL` / `KnexJS (Query Builder)` / `ObjectionJS (ORM)`

---

[check out my app checklist →](/docs/history-log.md)