# Internship Hub

## Overview
Internship Hub is a web application designed to connect students with local businesses offering internships. It allows students to browse and apply for internships while businesses can post and manage internship listings.

## Features
### For Students:
- Browse internship listings
- Apply for internships
- View application status
- Receive internship recommendations
- Message businesses

### For Businesses:
- Post new internships
- View applications for posted internships
- Manage company profile
- Message applicants

## Technologies Used
- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Firebase (Firestore, Authentication, Storage)
- **Authentication:** Firebase Authentication
- **Messaging System:** Firestore Realtime Database
- **Deployment:** Vercel

## Installation & Setup
### Prerequisites:
- Install [Node.js](https://nodejs.org/)
- Install Git

### Steps:
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/internship-hub.git
   ```
2. Navigate into the project directory:
   ```sh
   cd internship-hub
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add the following variables:
     ```env
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```
5. Start the development server:
   ```sh
   npm run dev
   ```
6. Open the app in your browser at:
   ```
   http://localhost:3000
   ```
## Contribution
1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
3. Make your changes and commit:
   ```sh
   git commit -m "Add new feature"
   ```
4. Push the changes:
   ```sh
   git push origin feature-branch
   ```
5. Create a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any questions or issues, feel free to contact codyhanna8@gmail.com.

