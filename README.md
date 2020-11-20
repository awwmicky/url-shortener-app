# URL Shortener App

> ### Status: **Not Deployed**

The idea to have your own library of short/custom url links, helps with sending them quick & making it easy to read.
The goal to is to personalize the links, track the number of clicks, & set the "time ago" it was published.
The tech. tools I used to create this web app are React, Sass, Node, Express, & PostgreSQL.

## Getting Started
To get the server running locally:

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

## Features

### Tasks/To-Dos
1. user paste url link > submits it > custom link btn pops up
2. two options from result URL:
    - user clicks button to copy link
    - user clicks edit button to update custom link name
3. after submitting link, user can view a table of URL history logs
4. three options for each URL:
    - user clicks button to copy link
    - user clicks edit button > pop-up box shows to edit & save custom link
    - user clicks delete button > pop-up box shows to confirm & delete link

### Routes/Paths
- to view client-side calls, click [api](/client/src/apis/api-call.js)
- to view server-side routes, click [page](/routers/page-route.js) or [url](/routers/url-route.js)

| Method | Pattern | Handler |
|---|---|---|
| **GET**    | `/all`           | read all url data         |
| **GET**    | `/:custom`       | redirect to url           |
| **GET**    | `/url/:custom`   | read one url data         |
| **POST**   | `/url/new`       | create custom url         |
| **PATCH**  | `/url/:id`       | update custom url name    |
| **PATCH**  | `/url/count/:id` | update # of clicks to url |
| **DELETE** | `/url/:id`       | remove url data           |

## Code Overview

### Tech Tools Used
- **Front-End**: `React (Hooks)` / `Sass`
    - http request: `Axios`
- **Back-End**: `Node` / `Express`
    - url tools: `nanoid` / `url-parse` / `yup`
    - protection: `helmet` / `cors`
- **Database**: `PostreSQL` / `KnexJS (Query Builder)` / `ObjectionJS (ORM)`

### Application Structure
What each file/folder contains:

- `server.js` - the entry point to our application. 
    - it defines the express server, specify its API routes, and connects it to PostgreSQL.
- `/client` - renders static page to display the UI.
- `/config` - configurations for the database access.
- `/controllers` - handles the requests & responses.
- `/database` - handles migrates & seeds to source the data.
- `/middleware` - handles custom errors & validations.
- `/models` -  helps create, update, & validate model schemas.
- `/routers` - the route definitions for the APIs paths.

### Error Handling
In `server.js`, it will listen to any 400s and 500s errors. In `/middleware` , there is error handling and validation handling. These middleware will respond with a 422 status code and format the response to the client.

---

[check out my app checklist →](/docs/history-log.md)