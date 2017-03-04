# Database Module II

In this lesson, we'll write a Node.js and Express HTTP API that queries a relational database and exposes it as JSON.


## The Database

This is an SQLite database that is based upon the homework from the first database module. The design embraces various one-to-many and many-to-many relationships:

![ERD](http://i.imgur.com/e8No8Xt.png)


## The Server

This repository contains an [Express app](https://github.com/Code-Your-Future/db-module-ii/blob/master/src/server.js) that exposes a [series of routes](https://github.com/Code-Your-Future/db-module-ii/blob/master/src/routes/organisations.js) for interacting with the database.

There are some [end-to-end tests](https://github.com/Code-Your-Future/db-module-ii/blob/master/test/e2e-test.js) that will hit the endpoints exposes by the server and ensure that the data is updated as expected.


## Your Task

Implement the routes so that the end-to-end tests pass! :)

The server already opens the database, so you need to query it; you can do this directly in the route file. We're using the [`node-sqlite`](https://github.com/kriasoft/node-sqlite) module to connect to and manipulate the database.

Think carefully about the queries you should make and the joins that may be required.


### Stretch Goals

* Add routes to get, add, update, and delete users. Please write end-to-end tests for these following the same format as the tests for `/organisations`.

* [SQL injection](https://en.wikipedia.org/wiki/SQL_injection) is a vulnerability via which malicious SQL code can be executed by an application
  * e.g. requesting `HTTP DELETE` to `http://localhost:8000/organisations/1 AND ID=2` will result in two organisations being deleted
  * Figure out how this can be prohibited (hint: check the `dependencies` in `package.json` ;)


## Homework

**In the same groups as the homework for Database I**, research [Object-Relational Mappers](https://en.wikipedia.org/wiki/Object-relational_mapping) (ORMs), their benefits, and reimplement this exercise using one.