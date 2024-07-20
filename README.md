# AutoQ

## Overview

AutoQ is a web application built with React and Firebase that simplifies the process of creating question papers. Users can create classes, manage subjects within those classes, and add questions for each subject. The application allows users to compile questions from their stored list to create new question papers efficiently.

## Features

- **Class Management**: Create and manage classes to organize your subjects.
- **Subject Management**: Add subjects under each class for better categorization.
- **Question Storage**: Add, edit, and delete questions for each subject.
- **Question Paper Creation**: Select questions from your stored list to create new question papers for specific subjects.
- **Firebase Integration**: Utilizes Firebase for real-time data storage and authentication.

## Technologies Used

- **Frontend**: React
- **Backend**: Firebase (Firestore for database, Authentication)
- **Styling**: CSS/Styled Components (or any other styling library you choose)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Ananth-Joshi/autoQ.git
   cd autoQ
2. **Install dependencies**:
   ```npm install
3. ### Set up Firebase:

  - **Create a new Firebase project**:
    - Create a new Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - Enable Firestore and Authentication (Email/Password or any method you prefer).
    - Add your Firebase configuration to a `.env` file in the root of your project:

   ```plaintext
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id (optional)

4. ###Run the application:
   ```npm run dev
