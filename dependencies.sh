#!/bin/bash

# Run npm install commands in the background
npm i --save @nestjs/config zeptomail &
npm i --save @nestjs/bullmq bullmq &

# Wait for all background processes to complete
wait

# Print success message
echo "Dependencies installed successfully."
