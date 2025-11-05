# MongoDB Setup Guide

The error `ECONNREFUSED` means MongoDB is not running. You need to install and start MongoDB first.

## Install MongoDB on Windows

### Option 1: MongoDB Community Edition (Recommended)

1. **Download MongoDB:**
   - Visit: https://www.mongodb.com/try/download/community
   - Select:
     - Version: Latest (or 7.0)
     - Platform: Windows
     - Package: MSI
   - Click "Download"

2. **Install MongoDB:**
   - Run the downloaded `.msi` file
   - Choose "Complete" installation
   - **Important:** Check "Install MongoDB as a Service"
   - Check "Install MongoDB Compass" (GUI tool - optional but helpful)
   - Complete the installation

3. **Verify Installation:**
   MongoDB should start automatically as a Windows service.

   To check if it's running:
   ```powershell
   Get-Service MongoDB
   ```
   
   Or check in Services:
   - Press `Win + R`, type `services.msc`
   - Look for "MongoDB" service
   - Status should be "Running"

### Option 2: Using Chocolatey

If you have Chocolatey installed:
```powershell
choco install mongodb
```

### Option 3: Using winget

```powershell
winget install MongoDB.Server
```

## Start MongoDB Service

If MongoDB is installed but not running:

### Method 1: Using Services
1. Press `Win + R`, type `services.msc`
2. Find "MongoDB" service
3. Right-click → Start

### Method 2: Using PowerShell (as Administrator)
```powershell
Start-Service MongoDB
```

### Method 3: Using Command Prompt (as Administrator)
```cmd
net start MongoDB
```

## Verify MongoDB is Running

Test the connection:
```powershell
mongosh
```

Or test the connection string:
```powershell
mongosh "mongodb://localhost:27017"
```

If you see a MongoDB shell prompt, it's working!

## After MongoDB is Running

1. **Run the seed script again:**
   ```powershell
   cd backend
   npm run seed
   ```

2. **Start the server:**
   ```powershell
   cd backend
   npm start
   ```

## Alternative: Use MongoDB Atlas (Cloud)

If you don't want to install MongoDB locally, you can use MongoDB Atlas (free tier):

1. Sign up at: https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/grocery_shop
   ```

## Troubleshooting

**Error: "MongoDB service failed to start"**
- Check if port 27017 is already in use
- Run PowerShell as Administrator
- Check MongoDB logs in: `C:\Program Files\MongoDB\Server\[version]\log\`

**Error: "Access denied"**
- Make sure you're running commands as Administrator if needed
- Check Windows Firewall settings

**Can't find MongoDB in Services**
- MongoDB may not have been installed as a service
- Reinstall and make sure to check "Install MongoDB as a Service"

