#!/usr/bin/env bash

npm run --silent fix public/static/assets/js/main/*.js
npm run --silent fix public/static/assets/js/libs/utilz.js
npm run --silent fix server/sockets/modules/*.js
npm run --silent fix server/db/*.js
npm run --silent fix server/db/modules/*.js
npm run --silent fix utils/*.js