#!/bin/bash

echo "🚀 ShopEase Setup Script"

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    echo "Creating backend/.env from example..."
    cp backend/.env.example backend/.env
    echo "⚠️  Please edit backend/.env with your actual values!"
fi

if [ ! -f "frontend/.env" ]; then
    echo "Creating frontend/.env from example..."
    cp frontend/.env.example frontend/.env
    echo "⚠️  Please edit frontend/.env with your actual values!"
fi

# Install dependencies
echo "Installing backend dependencies..."
cd backend && npm install

echo "Installing frontend dependencies..."
cd ../frontend && npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env with your MongoDB URI and secrets"
echo "2. Edit frontend/.env with your API URL"
echo "3. Run 'npm run dev' in backend folder"
echo "4. Run 'npm start' in frontend folder"