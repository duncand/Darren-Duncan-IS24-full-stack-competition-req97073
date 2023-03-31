# Province of British Columbia - Web Application Inventory (PBCWAI)

PBCWAI is a simple web-based database application that empowers the
Province of British Columbia to track and manage their web applications.

The canonical home of PBCWAI is
<https://github.com/duncand/Darren-Duncan-IS24-full-stack-competition-req97073>.

## Structure

PBCWAI is implemented as a pair of applications named PBCWAI-DBMS and
PBCWAI-WEBAPP, such that the latter is what end users typically interact
with directly using a generic web browser, and the former is a supporting
service providing a RESTful API that the latter consumes.

### PBCWAI-DBMS

PBCWAI-DBMS is a TypeScript/JavaScript application that runs in a
server-side Node.js <https://nodejs.org> environment.

It is written against the ECMAScript standard version 12 (2021) so you
should have a fairly modern Node.js.

PBCWAI-DBMS is built around the NestJS framework, so the latter's main
documentation site <https://docs.nestjs.com> can be used to understand its
architecture and how to build and run it at a generic level.

But this current README will specify how to run PBCWAI-DBMS in a common
dev environment so you don't actually have to look at external docs.

### PBCWAI-WEBAPP

PBCWAI-WEBAPP is a TypeScript/JavaScript application that runs primarily in
the end-user's web browser with supporting functionality in a server-side
Node.js <https://nodejs.org> environment.

It is written against the ECMAScript standard version 12 (2021) so you
should have a fairly modern Node.js and web browser.

PBCWAI-WEBAPP is built around the React library, so the latter's main
documentation site <https://react.dev/learn> can be used to understand its
architecture and how to build and run it at a generic level.

But this current README will specify how to run PBCWAI-WEBAPP in a common
dev environment so you don't actually have to look at external docs.

## Installation

These instructions assume a modern UNIX-like shell environment, like one
would have with a modern Linux or Apple MacOS system.  If you are using a
Microsoft Windows system, some alterations may be necessary.

### Prerequisite - Node.js

You should have Node.js <https://nodejs.org> installed.
A common way to do so is using your operating system's package manager,
or with Homebrew <https://brew.sh> in the case of MacOS.

This will provide the `npm` (Node Package Manager) utility and other tools
you would use for most setup or runtime tasks afterwards.

### Project Source Code

Obtain the latest source code for this project from its public repository at
<https://github.com/duncand/Darren-Duncan-IS24-full-stack-competition-req97073>.
You can use a `git` client to clone/pull it, or GitHub can privide a zip file.

All shell command sequences given here to setup or run PBCWAI itself assume
your starting current working directory is the root level of your clone of
this project's source folder, unless otherwise stated.

### Node Package Manager

Before the first run of the PBCWAI-DBMS server, in a shell session, first
`cd` into the `pbcwai-dbms` folder and run the following command, which
will fetch/install the server's additional JavaScript library dependencies:

```
    npm install
```

Before the first run of the PBCWAI-WEBAPP server, in a shell session, first
`cd` into the `pbcwai-webapp` folder and run the following command, which
will fetch/install the server's additional JavaScript library dependencies:

```
    npm install
```

### Data File

PBCWAI-DBMS uses a JSON-formatted plain text file to keep its inventory
data in.  You need to supply such a valid file in a file system location of
your choice and tell the application where it is.

An example data file `data_seed_for_copying.json` is provided in the
`pbcwai-dbms` folder of the project.  You should not specify this file
itself as your data file, but you can specify a duplicate of it.

If you want to use an "empty" data file, then you just need one that
defines an empty JSON array, so its entire content is just `[]`.

The following instructions assume you named your data file `data.json` and
located it in the same `pbcwai-dbms` folder.

## Running the Servers

### PBCWAI-DBMS

To start the PBCWAI-DBMS server, in a shell session, first `cd` into the
`pbcwai-dbms` folder and run the following command, adjusting for your
choice of data file path:

```
    DATA_FILE_PATH=data.json npm run start:dev
```

You are required to explicitly give the path of the data file as a safety
measure, so the server isn't going and making changes to any file except
what you specify.  You can do so either with an environment variable like
shown here, or by setting it in a `.env` file.

If you do not explicitly set `DATA_FILE_PATH`, then the server will
complain at startup with an error message about this plus exception in the
shell output; the server will not quit, but it will not work properly.

The actual specified data file doesn't need to exist until the actual times
that API invocations are made of the server.  The server will re-read the
file for every API call, and validate that it is present and is a well
formed set of product records, and the API will return a 500 response if it
isn't without attempting to alter or create the file.  Assuming it is
valid, and the API invocation is also valid, any API invocation that is
a create/modify/remove request will rewrite the file.  You can manually
edit the file between API calls, including to fix it if it is damaged.

We assume only a single instance of PBCWAI-DBMS is running at a time for
any given data file, and that the server serializes handling of API calls;
it is not designed to handle concurrent access of multiple instances or
API calls to the same data file at once; data loss may occur in that case.

The PBCWAI-DBMS server will listen on localhost port 3000, that port choice
being hard-coded with respect to PBCWAI-DBMS in both PBCWAI apps.

(Note that the server is running in a mode that watches for changes to the
source code files and automatically reloads them if it sees any changed.)

To stop the server, hit CTRL-C in the same shell session.

### PBCWAI-WEBAPP

To start the PBCWAI-WEBAPP server, in a shell session, first `cd` into the
`pbcwai-webapp` folder and run the following command, adjusting for your
choice of data file path:

```
    PORT=8080 npm start
```

The PBCWAI-WEBAPP server will listen on localhost port 8080, or whatever
alternate port you choose in the above environment variable setting or
alternately in a `.env` file.

If you do not explicitly set `PORT`, then the server will attempt to listen
on port 3000 as well, which won't work since the other server is using it.

(Note that the server is running in a mode that watches for changes to the
source code files and automatically reloads them if it sees any changed.)

To stop the server, hit CTRL-C in the same shell session.

## Using the PBCWAI Application

Visit <http://localhost:8080> in a web browser while both servers are
running to actually use the application as a regular end user.

Visit <http://localhost:3000/api/api-docs> to view the REST API
documentation or try out invoking it directly.

## Author

Darren Duncan - darren@DarrenDuncan.net

## License and Copyright

PBCWAI is Copyright © 2023, Darren Duncan.

PBCWAI is free software;
you can redistribute it and/or modify it under the terms of the Apache
License, Version 2.0 (AL2) as published by the Apache Software Foundation
(<https://www.apache.org>).  You should have received a copy of the
AL2 as part of the PBCWAI distribution, in the file
[LICENSE/Apache-2.0.txt](LICENSE/Apache-2.0.txt); if not, see
<https://www.apache.org/licenses/LICENSE-2.0>.

Any versions of PBCWAI that you modify and distribute must carry prominent
notices stating that you changed the files and the date of any changes, in
addition to preserving this original copyright notice and other credits.
PBCWAI is distributed in the hope that it will be
useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
