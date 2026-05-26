#!/bin/bash
# Quick reinstall script for Mac/Linux

echo "========================================"
echo "  Nimbus Package Reinstall Script"
echo "========================================"
echo ""

echo "Step 1: Backing up package.json..."
cp package.json package.json.backup 2>/dev/null
echo "✓ Backup created: package.json.backup"
echo ""

echo "Step 2: Removing old packages..."
if [ -d "node_modules" ]; then
    echo "Deleting node_modules folder..."
    rm -rf node_modules
    echo "✓ node_modules deleted"
else
    echo "✓ node_modules not found (already clean)"
fi

if [ -f "package-lock.json" ]; then
    echo "Deleting package-lock.json..."
    rm package-lock.json
    echo "✓ package-lock.json deleted"
else
    echo "✓ package-lock.json not found (already clean)"
fi
echo ""

echo "Step 3: Installing packages..."
echo "This may take a few minutes..."
echo ""
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "  ✓ Installation Complete!"
    echo "========================================"
    echo ""
    echo "Next steps:"
    echo "  1. Start Expo: npx expo start -c"
    echo "  2. Test the app on your device"
    echo ""
    echo "If you have issues, see REINSTALL_PACKAGES.md"
    echo ""
else
    echo ""
    echo "========================================"
    echo "  ✗ Installation Failed"
    echo "========================================"
    echo ""
    echo "Try these steps:"
    echo "  1. Check your internet connection"
    echo "  2. Clear npm cache: npm cache clean --force"
    echo "  3. Try again with: sudo ./reinstall.sh"
    echo ""
fi
