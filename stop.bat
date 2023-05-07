@echo off

echo Killing processes running on port 4000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :4000.*LISTENING') do (
    echo -Killing process on port 4000 with PID %%a
    taskkill /F /PID %%a
)

echo Killing processes running on port 3000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000.*LISTENING') do (
    echo -Killing process on port 3000 with PID %%a
    taskkill /F /PID %%a
)

echo Killed all processes running on ports 4000 and 3000
