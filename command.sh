#!/bin/bash
npm run server &
P1=$!
npm start &
P2=$!
wait $P1 $P2
