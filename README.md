# CloudShare - Frontend

A modern, full-featured file sharing and cloud storage web application built with React and Vite. CloudShare allows users to securely upload, manage, share, and track their files with an intuitive dashboard interface.

## 🚀 Features

### Core File Management
- **Upload Files**: Upload multiple files at once with drag-and-drop support
- **My Files**: Browse and manage all your uploaded files with list and grid view options
- **File Operations**:
  - Download files to your local device
  - Delete files permanently
  - Toggle files between public and private
  - Copy shareable links for public files
  - View file metadata (name, size, upload date)

### User Authentication & Security
- **Clerk Authentication**: Secure sign-up and login via Clerk
- **Role-Based Access Control**: Authenticated routes and user-specific data
- **JWT Token Management**: Automatic token handling for API requests

### Credits & Subscription System
- **Credit-Based Uploads**: Users start with 5 credits, 1 credit per file upload
- **Subscription Plans**:
  - Premium Plan: 500 credits
  - Ultimate Plan: 5000 credits
- **Payment Integration**: Razorpay payment gateway for purchasing credits
- **Credits Display**: Real-time credit balance in navigation bar

### Public File Sharing
- **Public File View**: Share files with public links without authentication
- **Shareable Links**: Generate and copy direct links to share files
- **Link Sharing Modal**: Easy-to-use interface for managing share links

### Dashboard & Analytics
- **Dashboard Overview**: See recent uploaded files at a glance
- **Transaction History**: Track all credit purchases and payment transactions
- **User Profile**: View and manage user account information
- **Real-time Updates**: Credits update immediately after successful purchases

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Payment Gateway**: Razorpay
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Routing**: React Router

## 📁 Project Structure

```
cloudshare-webapp/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── FileCard.jsx
│   │   ├── FileListRow.jsx
│   │   ├── UploadBox.jsx
│   │   ├── LinkShareModal.jsx
│   │   ├── ConfirmationDialog.jsx
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── Dashboard.jsx
│   │   ├── MyFiles.jsx
│   │   ├── Upload.jsx
│   │   ├── PublicFileView.jsx
│   │   ├── Subscription.jsx
│   │   ├── Transactions.jsx
│   │   └── Landing.jsx
│   ├── context/             # React Context (UserCreditsContext)
│   ├── layout/              # Layout components
│   ├── util/                # Utility functions and API endpoints
│   └── App.jsx
├── public/                  # Static assets
├── package.json
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository and navigate to the frontend directory:
```bash
cd cloudshare-webapp
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the required environment variables:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🔄 How It Works

### File Upload Flow
1. User logs in via Clerk authentication
2. Drags/selects files on the Upload page
3. System checks available credits (1 credit per file)
4. Files are uploaded to the backend via multipart form-data
5. Credits are deducted upon successful upload
6. Files appear in "My Files" and Dashboard

### File Sharing Flow
1. User clicks "Share" on any file in "My Files"
2. System generates a public shareable link
3. User can copy the link and share with anyone
4. Public can access file without authentication via unique link

### Purchase Credits Flow
1. User navigates to Subscription page
2. Selects a plan (Premium or Ultimate)
3. Clicks "Purchase" to initiate payment
4. Razorpay payment modal appears
5. User completes payment
6. Credits are added to account in real-time
7. Transaction record is saved

## 🔐 Security Features

- **JWT Authentication**: All API requests include Bearer token
- **Clerk Integration**: Industry-standard authentication
- **CORS Protection**: Configured on backend
- **Secure API Endpoints**: Token validation on every request
- **HTTPS Ready**: Can be deployed with HTTPS

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark-Friendly**: Tailwind CSS for modern styling
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Skeleton loaders and spinners for async operations
- **Error Handling**: User-friendly error messages
- **Modal Dialogs**: Confirmation dialogs for destructive actions

## 🔗 API Integration

The frontend communicates with the backend API at `http://localhost:9090/api/v1.0` with the following endpoints:
- `GET /files/my` - Fetch user's files
- `POST /files/upload` - Upload files
- `PATCH /files/{id}/toggle-public` - Toggle file visibility
- `DELETE /files/{id}` - Delete file
- `GET /files/download/{id}` - Download file
- `GET /users/credits` - Get user credits
- `POST /payments/create-order` - Create payment order
- `POST /payments/verify-payment` - Verify payment
- `GET /transactions` - Get transaction history
- `GET /files/public/{id}` - Access public file

## 📦 Deployment

The frontend can be deployed to services like:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

Build the production bundle:
```bash
npm run build
```

## 🤝 Contributing

Contributions are welcome! Please follow the existing code structure and styling conventions.

## 📄 License

This project is part of the CloudShare application suite.
