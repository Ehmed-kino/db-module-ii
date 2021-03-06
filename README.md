# Database Module II

In this lesson, we'll write a Node.js and Express HTTP API that queries a relational database and exposes it as JSON.


## The Database

This is an SQLite database that is based upon the homework from the first database module. The design embraces various one-to-many and many-to-many relationships:

![ERD](http://i.imgur.com/e8No8Xt.png)

Note that **all of the IDs are auto-incrementing** - this means that when you add a new record to a table, SQLite will manage the primary key for you; there is no need to explicitly set this.

Perhaps the simplest means of understanding our database is to look at the [SQL query](https://github.com/Code-Your-Future/db-module-ii/blob/master/data/transactions/create-tables.sql) used to create our tables.

## The Server

This repository contains an [Express app](https://github.com/Code-Your-Future/db-module-ii/blob/master/src/server.js) that exposes a [series of routes](https://github.com/Code-Your-Future/db-module-ii/blob/master/src/routes/organisations.js) for interacting with the database.

There are some [end-to-end tests](https://github.com/Code-Your-Future/db-module-ii/blob/master/test/e2e-test.js) that will hit the endpoints exposes by the server and ensure that the data is updated as expected.


## Your Task

Implement the routes so that the end-to-end tests pass! :)

The server already opens the database, so you just need to query it; you can do this directly in the route file via the imported `db` object.

We're using the [`node-sqlite`](https://github.com/kriasoft/node-sqlite) module to connect to and manipulate the database. It follows the same [API as node-sqlite3](https://github.com/mapbox/node-sqlite3/wiki/API), only it returns `Promise`s in lieu of using callbacks.

Think carefully about the queries you should make and the joins that may be required.


### Stretch Goals

* Add routes to get, add, update, and delete users. Please write end-to-end tests for these following the same format as the tests for `/organisations`.

* [SQL injection](https://en.wikipedia.org/wiki/SQL_injection) is a vulnerability via which malicious SQL code can be executed by an application
  * e.g. requesting `HTTP DELETE` to `http://localhost:8000/organisations/1 OR Id=2` will result in two organisations being deleted!
  * Research how this can be prohibited, and implement this resolution in the project


## Homework

**In the same groups as the homework for Database I**, research [Object-Relational Mappers](https://en.wikipedia.org/wiki/Object-relational_mapping) (ORMs), their benefits, and reimplement this exercise using one.