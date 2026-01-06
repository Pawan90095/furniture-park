@echo off
setlocal enabledelayedexpansion
echo ========================================
echo   Auto-Sync for Furniture Park
echo ========================================
echo.

cd /d "d:\furniture-park"

REM Clear old credentials
git config --unset credential.helper
git remote set-url origin https://github.com/Pawan90095/furniture-park.git

echo IMPORTANT: Paste your GitHub Token carefully!
echo.
echo Token kaise paste karein:
echo 1. Token ko copy karein (Ctrl+C)
echo 2. Yahaan right-click karke paste karein
echo 3. Enter dabayein
echo.
echo WARNING: Token paste karte waqt dikhai nahi dega (security)
echo.

set /p TOKEN=Enter GitHub Token: 

REM Validate token is not empty
if "!TOKEN!"=="" (
    echo.
    echo ERROR: Token empty hai! Script band kar rahe hain.
    pause
    exit /b 1
)

REM Update remote with token embedded
git remote set-url origin https://!TOKEN!@github.com/Pawan90095/furniture-park.git

echo.
echo Testing connection...
git ls-remote origin >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Token invalid hai! 
    echo.
    echo Please check:
    echo 1. Token correctly copied (no spaces)
    echo 2. Token has "repo" permission
    echo 3. Token is not expired
    echo.
    pause
    exit /b 1
)

echo.
echo ✓ Connection successful!
echo ========================================
echo   Auto-Sync Started!
echo   Press Ctrl+C to stop
echo ========================================
echo.

:loop
echo [%date% %time%] Checking for changes...

git add . >nul 2>&1
git diff --staged --quiet
if %errorlevel% neq 0 (
    echo [%date% %time%] Changes found! Uploading...
    git commit -m "Auto-sync: %date% %time%" >nul 2>&1
    git push origin main >nul 2>&1
    if %errorlevel% equ 0 (
        echo [%date% %time%] ✓ Upload successful!
    ) else (
        echo [%date% %time%] ✗ Upload failed! Check internet connection.
    )
) else (
    echo [%date% %time%] No changes.
)

timeout /t 30 /nobreak >nul
goto loop
