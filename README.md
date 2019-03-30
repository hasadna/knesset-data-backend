This project is a backend for [knesset-data-web-ui](https://github.com/WEBbeast2018/knesset-data-web-ui/)

API server is available at [https://api.oknesset.org](https://api.oknesset.org)



## Table of Contents
- [Try API](#try-api)
- [Getting Started](#getting-started)
- [Routes](#routes)
- [Data Cache](#data-cache)

## Try API
### Committees
* [https://api.oknesset.org/api/committees-by-knesset/](https://api.oknesset.org/api/committees-by-knesset/)
* [https://api.oknesset.org/api/committees-by-knesset/20](https://api.oknesset.org/api/committees-by-knesset/20)
* [https://api.oknesset.org/api/committees-by-knesset/20/922](https://api.oknesset.org/api/committees-by-knesset/922)

### Legislation
* [https://api.oknesset.org/api/legislation-by-knesset/](https://api.oknesset.org/api/legislation-by-knesset/)
* [https://api.oknesset.org/api/legislation-by-knesset/20](https://api.oknesset.org/api/legislation-by-knesset/20)

### Getting Started
```
git clone
npm install
```
Then `npm start` for standard/production  mode OR `npm run dev` for development

### Routes
On topic route, data service will be called to fetch the appropriate date. see file: `committees.route.js`

* `/committees-by-knesset` - statistics of all committees per knesset
  - collection:{knesset-id, knesset-name, #committees-per-knesset, #meetings-per-knesset}

* `/committees-by-knesset/:knessetId'` - committees data for specific knesset (id, name, meetings num)
  - single:{knesset-id, knesset-name}
  - collection:{committee-id,  committee-name, #meetings-per-knesset}

* `/committees-by-knesset/:knessetId/:committeeId'` - all meetings of a specific committee (for specific knesset)
  - single:{knesset-id, knesset-name, committee-id,  committee-name, mks-id-collection}
  - collection:{meeting-id, meeting-name, meeting-date, has-protocol}


* `/committees-by-knesset/:knessetId/:committeeId/:meetingId'` - specific meeting data (protocol)
  - single:{knesset-id, knesset-name, committee-id,  committee-name, meeting-id, meeting-name, meeting-date, mks-id-collection, general-protocol-data}
  - collection:{speaker, mk-id(-1 if not mk), content }


* `/legislation-by-knesset/` - basic data about legislation for every knesset
  - single: {KnessetNum, #num_bills}

* `/legislation-by-knesset/:knessetNum` - comprehensive data about legislation in a specific knesset
* `/legislation` - comprehensive data about legislation
  - single: {BillID, KnessetNum, Name, PrivateNumber, StatusID, PostponementReasonDesc, LastUpdatedDate, SubTypeID, SubTypeDesc}
  - collection: {files, bill_initiators}

those queries can get more parameters:

  - Name: to search in the bill name/title
  - SubTypeDesc: (פרטית, ממשלתית או ועדה)
  - PrivateNumber: for private legislation
  - page: to get the next 20 results (start from 1)
  - StatusId: to search by statuses (#TODO: list statuses number and meaning)
  - BillID: ID in knesset site.
  - "Start" or "End" can be appended to numeric params.

examples:

    /legislation-by-knesset/20?SubTypeDesc=ממשלתית
    /legislation?Name=ציבורי&page=2
    /legislation-by-knesset/19?SubTypeDesc=פרטית&PrivateNumberStart=50&PrivateNumberEnd=60

### Data Cache

Routes will be cached using [nano-cache](https://github.com/akhoury/nano-cache#readme) for specific period of time. see `data.service.js`.
To avoid caching or set specific TTL for cache - add the following line to `secrets/db.config.json`:

    "dbCacheTtl" : 1


### Running using Docker

Build

```
docker build -t knesset-data-backend .
```

Create DB credentials file

```
{
  "user": "",
  "database": "",
  "password": "",
  "host": "",
  "port": 1234
}
```

Run (replace DB_CREDENTIALS_FILE with path to the file you created)

```
docker run -it -v DB_CREDENTIALS_FILE:/home/node/secrets/db.config.json \
           -p 4000:4000 knesset-data-backend
```

Backend should be available at http://localhost:4000/api/committees-by-knesset


## Continuous Deployment

Merges to master are automatically deployed to: https://api.oknesset.org
