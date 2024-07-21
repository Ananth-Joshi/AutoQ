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
- **Styling**: TailwindCSS

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Ananth-Joshi/autoQ.git
   cd autoQ```
2. **Install dependencies**:
   ```npm install```
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
   ```
4. ### Run the application:
   ```npm run dev```

## Screenshots
![image](https://github.com/user-attachments/assets/4fe4d768-19a4-467a-b270-573e7e7354a8)
![image](https://github.com/user-attachments/assets/9c57ab9f-1949-4375-9742-fe06b4f2a89b)
![image](https://github.com/user-attachments/assets/11db7c99-68f3-413c-b009-5074701e4e6d)
![image](https://github.com/user-attachments/assets/d665b391-d0cd-4b85-ab67-054971fa461f)
![image](https://github.com/user-attachments/assets/e379858d-bdcc-48f1-a202-ab50864b60e0)
![image](https://github.com/user-attachments/assets/9b25c360-808e-47c7-bbd0-3cbd6479b310)
![image](https://github.com/user-attachments/assets/4c91ea21-ca5c-4e78-840f-8d6642f808d7)


## Acknowledgments

- [React](https://reactjs.org/) - JavaScript library for building user interfaces.
- [Firebase](https://firebase.google.com/) - Backend as a Service (BaaS) for real-time data storage and authentication.
- [DaisyUI](https://daisyui.com/) - A Tailwind CSS component library.
- [HyperUI](https://hyperui.dev/) - A collection of UI components and templates for Tailwind CSS.
- [React Query](https://react-query.tanstack.com/) - A data fetching and state management library for React.
- [React-PDF](https://react-pdf.org/) - A library for generating PDF documents in React applications.

