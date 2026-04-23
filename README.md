UC12-TDS 2.24
Fernando Jacinto
App de cadastro,
React Native (expo) + Firebase

Regras firebase:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /pets/{doc} {
      allow read, write: if request.auth != null;
    }

  }
}
