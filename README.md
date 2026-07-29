# Call D2

Two pages, one Firebase project:

- **index.html** — the staff-facing page. Big "D2" button → type where they are → sends it.
- **dashboard.html** — your page. Keep it open on your phone/tablet; it flashes and dings when someone calls.

## 1. Set up Firebase (5 min, free)

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project** → give it any name (e.g. `towne-tavern-d2`).
2. In the left menu, go to **Build → Firestore Database → Create database**. Start in **production mode**, pick a region near you.
3. Go to the **Rules** tab of Firestore and paste this in, then hit **Publish**:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /calls/{callId} {
         allow read, write: if true;
       }
     }
   }
   ```

   > Note: this allows anyone with the link to read/write calls — there's no login screen, so staff can tap and go. That's fine since the URL isn't public/discoverable, but if you ever want a PIN gate on the button page, let me know and I'll add one.

4. Go to **Project settings** (gear icon) → scroll to **Your apps** → click the **</> (Web)** icon → register an app (any nickname) → you'll see a `firebaseConfig` object like:

   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "towne-tavern-d2.firebaseapp.com",
     projectId: "towne-tavern-d2",
     storageBucket: "towne-tavern-d2.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef"
   };
   ```

5. Copy that whole object into **both** `index.html` and `dashboard.html`, replacing the placeholder `firebaseConfig` near the bottom of each file.

## 2. Deploy to GitHub Pages

Same as your other apps — push this folder to a repo, then in **Settings → Pages**, set the source to the branch/folder these files are in.

You'll end up with two links, e.g.:
- `https://yourname.github.io/d2-call-button/` → give this to staff
- `https://yourname.github.io/d2-call-button/dashboard.html` → keep this open on your end

## 3. Using it

- On your dashboard page, tap **Enable Sound Alerts** once when you open it (browsers require a tap before they'll allow sound). After that, leave the tab open and it'll alert you live.
- When a call comes in, tap **On my way** to clear it off the list.
- Calls aren't deleted, just marked resolved — so if you ever want a history of who called and when, that data's sitting in Firestore.
