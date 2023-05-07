@echo off

rem Kill all processes running on ports 4000 and 3000
call stop.bat

rem Start the backend
cd server
start cmd /k "npm run develop"

rem Wait for the backend to start up
ping -n 5 127.0.0.1 > nul

rem Start the frontend
cd ../client
start cmd /k "npm run start"
