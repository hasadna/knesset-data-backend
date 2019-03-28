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
On topic route, data service will be called to fetch the appropriate date. see file: `committees.route.js`

*`/committees` - statistics of all committees per knesset
  - collection:{knesset-id, knesset-name, #committees-per-knesset, #meetings-per-knesset}

*`/committees-by-knesset/:knessetId'` - committees data for specific knesset (id, name, meetings num)
  - single:{knesset-id, knesset-name}
  - collection:{committee-id,  committee-name, #meetings-per-knesset}

*`/committees-by-knesset/:knessetId/:committeeId'` - all meetings of a specific committee (for specific knesset)
  - single:{knesset-id, knesset-name, committee-id,  committee-name, mks-id-collection}
  - collection:{meeting-id, meeting-name, meeting-date, has-protocol}


*`/committees-by-knesset/:knessetId/:committeeId:meetingId'` - specific meeting data (protocol)
  - single:{knesset-id, knesset-name, committee-id,  committee-name, meeting-id, meeting-name, meeting-date, mks-id-collection, general-protocol-data}
  - collection:{speaker, mk-id(-1 if not mk), content }

### Data Cache

Routes will be cached using [nano-cache](https://github.com/akhoury/nano-cache#readme) for specific period of time. see `data.service.js`
