This project is a backend for [knesset-data-web-ui](https://github.com/WEBbeast2018/knesset-data-web-ui/)
Backend server is available at [https://oknesset-backend.herokuapp.com](https://oknesset-backend.herokuapp.com)

Try API:
[https://oknesset-backend.herokuapp.com/api/committees-by-knesset/](https://oknesset-backend.herokuapp.com/api/committees-by-knesset/)


## Table of Contents
- [Getting Started](#getting-started)
- [Routes](#routes)
- [Data Cache](#data-cache)


### Getting Started
```
git clone
npm install
```
Then `npm start` for standard/production  mode OR `npm run dev` for development

### Routes
On topic route, data service will be called to fetch the appropriate json for the route

* for route `/members` => fetch https://oknesset.org/members/index.json
* for route `/members/35` => fetch https://oknesset.org/members/35.json
* for route `/committees/952` => fetch https://oknesset.org/committees/952.json
* for route `/committees/952/2-0-2071137` => fetch https://oknesset.org/meetings/2/0/2071137.json

### Data Cache

Routes will be cached using [nano-cache](https://github.com/akhoury/nano-cache#readme) for specific period of time. see `data.service.js`
