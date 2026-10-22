# NomNom Tracker

A calorie tracker built around Indian food: over 600 built-in foods (South Indian and Tamil, North, West and East Indian, snacks, bakery, sweets, drinks, fruit and veg, and world cuisine) with home-style servings, plus macros, water, activity, weight and a Gemini-powered coach. Anything not built in is searched in the USDA FoodData Central database, or Gemini can estimate it.

**Live app:** https://akashpxr.github.io/NomNom-Tracker/

- Sign in with Google or email to sync your diary between iPhone, PC and any other device (Firebase Authentication + Cloud Firestore).
- Or use it without an account; the diary then stays in that browser and moves into your account when you sign in later.
- Describe a meal in words or snap a photo and Gemini fills in the foods; Coach answers questions using your diary (Firebase AI Logic).
- Installable: on iPhone open the site in Safari, tap **Share → Add to Home Screen**. Works offline once loaded.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app: food database, UI, Firebase sync and Gemini calls |
| `config.js` | Firebase config, App Check site key and Gemini model name |
| `firestore.rules` | Security rules to paste into the Firebase console |
| `manifest.webmanifest`, `icons/` | Home-screen install name and icons |
| `sw.js` | Service worker for offline use |

## One-time Firebase setup (project `nomnom-91fee`)

1. **Authentication → Sign-in method:** turn on **Google** and **Email/Password**.
2. **Authentication → Settings → Authorized domains:** add `akashpxr.github.io`.
3. **Firestore Database → Create database:** Production mode, location `asia-south1`.
4. **Firestore → Rules:** paste `firestore.rules` and publish.
5. **AI Logic → Get started:** choose the **Gemini Developer API**.
6. **App Check** (Firebase requires it for AI Logic):
   - Create a **reCAPTCHA v3** key at https://www.google.com/recaptcha/admin/create with the domain `akashpxr.github.io`.
   - Firebase console → **App Check → Apps** → register the web app with **reCAPTCHA v3** and paste the key's **secret key**.
   - Put the **site key** in `config.js` as `RECAPTCHA_SITE_KEY`, then commit and push.
   - Testing on `localhost`: the browser console prints an App Check debug token; add it under **App Check → Apps → Manage debug tokens**.

## USDA food search (optional key)

`config.js` ships with `USDA_API_KEY = 'DEMO_KEY'`, which allows about 30 searches an hour. For more, get a free key by email at https://fdc.nal.usda.gov/api-key-signup and put it in `config.js`.

## GitHub Pages

Repository **Settings → Pages → Build and deployment:** Source **Deploy from a branch**, branch `main`, folder `/ (root)`.

## Run locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000. (`localhost` is allowed for Firebase sign-in by default.)

## Updating

Edit the files, then commit and push to `main`; GitHub Pages redeploys in about a minute. Open the app twice (or refresh) to pick up the new version.

Calorie values are typical home-style estimates. Oil, ghee and portion size change the real numbers.
