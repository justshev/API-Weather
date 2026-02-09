# ========================================
# Setup Script untuk Firebase Migration
# ========================================

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "  Firebase Migration Setup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

# Step 1: Clean old dependencies
Write-Host "`n[1/4] Cleaning old dependencies..." -ForegroundColor Yellow

if (Test-Path "node_modules") {
    Write-Host "  Removing node_modules..." -ForegroundColor Gray
    Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
}

if (Test-Path "package-lock.json") {
    Write-Host "  Removing package-lock.json..." -ForegroundColor Gray
    Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
}

Write-Host "  ✓ Cleanup complete!" -ForegroundColor Green

# Step 2: Install new dependencies
Write-Host "`n[2/4] Installing Firebase dependencies..." -ForegroundColor Yellow
Write-Host "  This may take a few minutes..." -ForegroundColor Gray

try {
    npm install
    Write-Host "  ✓ Dependencies installed!" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Error installing dependencies!" -ForegroundColor Red
    Write-Host "  Please run 'npm install' manually" -ForegroundColor Red
    exit 1
}

# Step 3: Setup .env file
Write-Host "`n[3/4] Setting up environment file..." -ForegroundColor Yellow

if (-not (Test-Path ".env")) {
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "  ✓ .env file created from .env.example" -ForegroundColor Green
        Write-Host "  ⚠ Please edit .env with your Firebase config!" -ForegroundColor Yellow
    } else {
        Write-Host "  ✗ .env.example not found!" -ForegroundColor Red
    }
} else {
    Write-Host "  ✓ .env already exists" -ForegroundColor Green
}

# Step 4: Verify installation
Write-Host "`n[4/4] Verifying installation..." -ForegroundColor Yellow

$firebaseInstalled = npm list firebase 2>$null | Select-String "firebase@"
$expressInstalled = npm list express 2>$null | Select-String "express@"

if ($firebaseInstalled -and $expressInstalled) {
    Write-Host "  ✓ Firebase installed" -ForegroundColor Green
    Write-Host "  ✓ Express installed" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Some packages might be missing" -ForegroundColor Yellow
}

# Summary
Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "  1. Edit .env file with your Firebase credentials" -ForegroundColor White
Write-Host "  2. Setup Firebase project (see QUICKSTART.md)" -ForegroundColor White
Write-Host "  3. Run: npm run dev" -ForegroundColor White

Write-Host "`nDocumentation:" -ForegroundColor Yellow
Write-Host "  - QUICKSTART.md      -> Quick 5-minute setup" -ForegroundColor White
Write-Host "  - FIREBASE_SETUP.md  -> Detailed Firebase guide" -ForegroundColor White
Write-Host "  - INSTALLATION.md    -> Troubleshooting" -ForegroundColor White

Write-Host "`nReady to start? Run:" -ForegroundColor Green
Write-Host "  npm run dev`n" -ForegroundColor Cyan
