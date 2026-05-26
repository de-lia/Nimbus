@echo off
REM Quick reinstall script for Windows

echo ========================================
echo   Nimbus Package Reinstall Script
echo ========================================
echo.

echo Step 1: Backing up package.json...
copy package.json package.json.backup >nul 2>&1
echo ✓ Backup created: package.json.backup
echo.

echo Step 2: Removing old packages...
if exist node_modules (
    echo Deleting node_modules folder...
    rmdir /s /q node_modules
    echo ✓ node_modules deleted
) else (
    echo ✓ node_modules not found (already clean)
)

if exist package-lock.json (
    echo Deleting package-lock.json...
    del package-lock.json
    echo ✓ package-lock.json deleted
) else (
    echo ✓ package-lock.json not found (already clean)
)
echo.

echo Step 3: Installing packages...
echo This may take a few minutes...
echo.
call npm install
echo.

if %ERRORLEVEL% EQU 0 (
    echo ========================================
    echo   ✓ Installation Complete!
    echo ========================================
    echo.
    echo Next steps:
    echo   1. Start Expo: npx expo start -c
    echo   2. Test the app on your device
    echo.
    echo If you have issues, see REINSTALL_PACKAGES.md
    echo.
) else (
    echo ========================================
    echo   ✗ Installation Failed
    echo ========================================
    echo.
    echo Try these steps:
    echo   1. Run as Administrator
    echo   2. Check your internet connection
    echo   3. Clear npm cache: npm cache clean --force
    echo   4. Try again
    echo.
)

pause
