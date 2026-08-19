#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "🚀 Starting Production Deployment for Mother of the Year..."
echo "=========================================================="

# 1. Reset any local modified files on production server and pull latest commits
echo "📦 1/7 Pulling latest code from GitHub..."
git reset --hard HEAD
git pull origin main

# 2. Install PHP Composer dependencies for production
echo "🐘 2/7 Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction --quiet || composer install --no-dev --optimize-autoloader

# 3. Install NPM dependencies
echo "📦 3/7 Installing Node packages..."
npm install --quiet || npm install

# 4. Build production assets with Vite
echo "⚡ 4/7 Building production assets (Vite)..."
npm run build

# 5. Run database migrations
echo "🗄️  5/7 Running database migrations..."
php artisan migrate --force

# 6. Clear and rebuild Laravel application cache
echo "🧹 6/7 Optimizing & caching Laravel configuration..."
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# 7. Try restarting/reloading PHP-FPM to clear OPcache
echo "🔄 7/7 Reloading PHP-FPM OPcache..."
if command -v systemctl >/dev/null 2>&1; then
    systemctl reload php8.4-fpm 2>/dev/null || systemctl reload php8.3-fpm 2>/dev/null || systemctl reload php-fpm 2>/dev/null || echo "⚠️ PHP-FPM reload skipped (no systemctl permissions or different service name)."
fi

echo "=========================================================="
echo "✅ DEPLOYMENT COMPLETED SUCCESSFULLY!"
echo "🌐 Your production website is live with the latest code."
