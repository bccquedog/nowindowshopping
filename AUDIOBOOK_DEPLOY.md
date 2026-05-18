# Audiobook deploy guide

How to ship the *Thirty Minutes in Cabo* audiobook page on nowindowshopping.com.

The audio files live separately in `~/Desktop/Books/MCU/audiobook/` and are served from
Firebase Storage (`nwspro-9044c.firebasestorage.app` → `audiobooks/thirty-minutes-in-cabo/`).
The site code only references URLs; it does not bundle the audio.

## 1. Preview locally

The player builds Firebase Storage URLs by default. If you want audio to actually play
in your dev server before uploading, run a tiny file server alongside CRA:

```bash
# terminal 1 — serve the audiobook files on localhost:8001
cd ~/Desktop/Books/MCU/audiobook
python3 -m http.server 8001

# terminal 2 — run the React app pointing at that server
cd ~/NWSWebsite/no-window-shopping
REACT_APP_AUDIOBOOK_BASE_URL=http://localhost:8001 npm start
```

Then open http://localhost:3000/mgcu and click into *Thirty Minutes in Cabo*.

The base URL is read at build time. To preview without audio (UI only), just `npm start`
— the player will render and the seek bar works, but chapter files will 404 until you
upload them.

## 2. Upload audio to Firebase Storage

You already have `gcloud` + `gsutil` installed but the active account
(`bblair@techephi.com`) is not the owner of `nwspro-9044c`. Reauth first:

```bash
# pick the account that owns nwspro-9044c
gcloud auth login mrbrianproctor@gmail.com    # or whichever owns it
gcloud config set project nwspro-9044c

# verify access
gsutil ls gs://nwspro-9044c.firebasestorage.app/
```

Then upload (parallel `-m` flag is much faster):

```bash
SRC=~/Desktop/Books/MCU/audiobook
DEST=gs://nwspro-9044c.firebasestorage.app/audiobooks/thirty-minutes-in-cabo

# 31 chapter MP3s
gsutil -m cp $SRC/mp3_openai/chapter_*.mp3 $DEST/

# Combined audiobook files (downloads)
# NOTE: the pretty filenames with spaces are intentional — they become the
# download filename in the user's browser.
gsutil cp "$SRC/mp3_openai_final/Thirty Minutes in Cabo.mp3" "$DEST/Thirty Minutes in Cabo.mp3"
gsutil cp "$SRC/mp3_openai_final/Thirty Minutes In Cabo.m4b" "$DEST/Thirty Minutes In Cabo.m4b"

# Cover art
gsutil cp $SRC/cover.png $DEST/
```

Total upload: ~1.1 GB. On a typical home connection, ~5-20 minutes.

## 3. Make the bucket path publicly readable

By default, Firebase Storage requires auth. The site is public, so we need the
`audiobooks/` path to be world-readable.

**Option A — set object ACLs on each file (fastest, no rules change):**

```bash
gsutil -m acl ch -u AllUsers:R \
  gs://nwspro-9044c.firebasestorage.app/audiobooks/thirty-minutes-in-cabo/**
```

**Option B — update Storage Rules in the Firebase console:**

Go to https://console.firebase.google.com/project/nwspro-9044c/storage/rules and
extend the rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // existing rules...

    match /audiobooks/{allPaths=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

Then "Publish".

## 4. Verify a URL works

```bash
curl -I "https://firebasestorage.googleapis.com/v0/b/nwspro-9044c.firebasestorage.app/o/audiobooks%2Fthirty-minutes-in-cabo%2Fchapter_00.mp3?alt=media"
```

Should return `HTTP/2 200`. If you get 403, the ACL step didn't take.

## 5. Deploy the site

Site auto-deploys via Vercel. From the repo root:

```bash
cd ~/NWSWebsite
vercel --prod
```

Or, if you have a git remote configured, push and let Vercel auto-build.

## 6. Sanity check the live page

After deploy, visit https://nowindowshopping.com/mgcu/library/thirty-minutes-in-cabo
and confirm:

- Cover loads
- "Listen now" plays Chapter 0 within ~1 second
- Chapter list scrolls and clicking a chapter switches tracks
- MP3 / M4B download buttons start a download
- Back/forward 15-30s skip buttons work

## Re-uploading after a re-render

If you re-render a chapter (e.g. fix a mispronunciation), just re-upload that one file:

```bash
gsutil cp ~/Desktop/Books/MCU/audiobook/mp3_openai/chapter_07.mp3 \
  gs://nwspro-9044c.firebasestorage.app/audiobooks/thirty-minutes-in-cabo/

gsutil acl ch -u AllUsers:R \
  gs://nwspro-9044c.firebasestorage.app/audiobooks/thirty-minutes-in-cabo/chapter_07.mp3
```

Firebase Storage URLs don't change — the browser will pull the new version (you may
need to hard-refresh once if it caches).

## Files in this repo touched by this work

- `src/mgcu/booksData.ts` — added `thirty-minutes-in-cabo` entry + audiobook fields + helpers
- `src/mgcu/MGCUAudiobookPlayer.tsx` — **new** — player component (cover, seek, chapter list, download)
- `src/mgcu/MGCUBook.tsx` — replaced placeholder with data-driven page
- `src/mgcu/MGCULibrary.tsx` — covers + audiobook badge
- `src/mgcu/MGCUHub.tsx` — featured-audiobook banner + tile grid
- `AUDIOBOOK_DEPLOY.md` — this file
