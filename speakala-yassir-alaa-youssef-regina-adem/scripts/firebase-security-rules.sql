-- Firebase Firestore Security Rules
-- Copy these rules to your Firebase Console > Firestore Database > Rules

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read and write access to the dictionary collection
    // Note: This is for development/demo purposes. In production, consider adding authentication
    match /dictionary/{document} {
      allow read, write: if true;
    }
    
    // Deny access to all other collections by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
