#!/bin/bash

# Check if a file argument is provided
if [ -z "$1" ]; then
  echo "Please provide a file as an argument."
  exit 1
fi

file="$1"

# Start the server process
echo "Starting server..."
deno task cmd "$file" &
deno task pdf && deno task open &
