# 🐐 QurbaniHat - Halal Livestock Booking Platform

## 📋 Overview

QurbaniHat is a modern web application that connects users with verified farms for halal livestock booking. The platform provides a seamless experience for browsing, selecting, and booking animals for Qurbani (sacrifice) purposes.

## ✨ Features

### 🔐 Authentication
- Email/Password registration and login
- Google OAuth integration
- Profile management (update name, email, password)
- Protected routes for authenticated users

### 🐪 Animal Management
- Browse available animals (cows, goats, sheep)
- View detailed animal information (age, weight, price, breed)
- Search and filter animals by type, price range, and other criteria
- Responsive grid layout for animal listings

### 📦 Booking System
- Book animals for Qurbani
- View order history
- Track order status (pending, confirmed, completed)
- Secure checkout process

### 🎨 User Experience
- Modern, responsive design with Tailwind CSS
- Loading skeletons for better UX
- Toast notifications for user actions
- Smooth scrolling and animations
- Mobile-friendly interface

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16.2.4 (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** Custom components with shadcn/ui inspiration
- **Icons:** Font Awesome
- **Animations:** CSS transitions and custom animations

### Backend & Services
- **Authentication:** Firebase Auth
- **Database:** Firebase Firestore (NoSQL)
- **Storage:** Firebase Storage
- **Deployment:** Vercel

### Development Tools
- **Language:** JavaScript/JSX
- **Linting:** ESLint
- **Package Manager:** npm
- **Version Control:** Git


## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm or yarn package manager
- Firebase account (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/qurbanihat.git
   cd qurbanihat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts development server with hot reload |
| `npm run build` | Creates optimized production build |
| `npm run start` | Runs production build locally |
| `npm run lint` | Runs ESLint for code quality checks |

## 🔧 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase authentication domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket URL |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Firebase analytics measurement ID |


## 📱 Key Features in Detail

### Authentication Flow
1. User registers with email/password or Google
2. User logs in with credentials
3. Protected routes redirect unauthenticated users to login
4. User can update profile information

### Animal Browsing
- All animals displayed in responsive grid
- Click on any animal to view details
- Filter animals by type, price range, and other attributes
- Search functionality for finding specific animals

### Booking Process
1. User selects an animal from listing or details page
2. Specifies quantity (if applicable)
3. Confirms booking details
4. Order is created in Firestore
5. User can view orders in profile section

## 🎨 Styling

The project uses Tailwind CSS with a custom color scheme:
- Primary colors: Rose/pink gradients
- Background: Soft gradient from pink-50 to amber-50
- Cards: White with subtle shadow and border
- Buttons: Gradient backgrounds with hover effects

## 🔒 Security

- Firebase Authentication handles user credentials securely
- Firestore security rules restrict data access
- Environment variables protect sensitive keys
- PrivateRoute wrapper protects authenticated routes

## 📄 License

This project is for educational/demonstration purposes.

## 👨‍💻 Author

**Sadia Rahman Smrity**

## 🙏 Acknowledgments

- Firebase for backend services
- Vercel for hosting
- Tailwind CSS for styling framework
- Font Awesome for icons

## 📞 Support

For issues or questions, please:
1. Check the troubleshooting section above
2. Review Firebase/Firestore documentation
3. Open an issue on GitHub

---

**Live Demo:** [https://qurbanihat-azure.vercel.app](https://qurbanihat-azure.vercel.app)

**Note:** Email verification is disabled for testing convenience. For production, consider re-enabling email verification and adding password recovery features.