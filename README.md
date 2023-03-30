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

This current README file will read or adapt a few salient details to help
you get PBCWAI-DBMS running quickly in common situations, and otherwise
will mainly focus on details specific to PBCWAI-WEBAPP.

### PBCWAI-WEBAPP

PBCWAI-WEBAPP is a TypeScript/JavaScript application that runs primarily in
the end-user's web browser with supporting functionality in a server-side
Node.js <https://nodejs.org> environment.

It is written against the ECMAScript standard version 12 (2021) so you
should have a fairly modern Node.js and web browser.

PBCWAI-WEBAPP is built around the React library, so the latter's main
documentation site <https://react.dev/learn> can be used to understand its
architecture and how to build and run it at a generic level.

This current README file will read or adapt a few salient details to help
you get PBCWAI-WEBAPP running quickly in common situations, and otherwise
will mainly focus on details specific to PBCWAI-WEBAPP.

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
