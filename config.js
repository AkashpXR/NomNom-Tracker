// NomNom Tracker settings.
// Everything in this file is safe to publish: Firebase web config and reCAPTCHA site keys are public
// identifiers. Your data is protected by the Firestore rules (firestore.rules) and Firebase Authentication.

export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCFLCtKnJhOJsjiAZwzDdBlAchVj2cfpG8',
  authDomain: 'nomnom-91fee.firebaseapp.com',
  projectId: 'nomnom-91fee',
  storageBucket: 'nomnom-91fee.firebasestorage.app',
  messagingSenderId: '389774752217',
  appId: '1:389774752217:web:8d664826da07068f4581c8',
};

// reCAPTCHA site key registered in Firebase console → App Check. Firebase AI Logic (Gemini) refuses
// requests until App Check is set up, so the describe, photo and Coach features need this.
export const RECAPTCHA_SITE_KEY = '';

// true if the key above is a reCAPTCHA Enterprise key, false if it is a reCAPTCHA v3 key.
export const RECAPTCHA_ENTERPRISE = false;

// Gemini model for meal descriptions, photos and Coach. Set to '' to turn the AI features off.
export const GEMINI_MODEL = 'gemini-3.8-flash';
