<div align="center">

# ⚡ CTSTrack

### Cognizant Digital Nurture 5.0 — Python Full Stack Engineer Progress Tracker

A self-built study companion for tracking the official DN5.0 Deepskilling curriculum — built from scratch as a hands-on way to *practice* the exact frontend skills the program teaches.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-ctstracker.vercel.app-4C5FD5?style=for-the-badge)](https://ctstracker.vercel.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## 📸 Preview

> _Add 3–4 screenshots or a short screen-recording GIF here once your real data is in — this is the single highest-impact section for anyone landing on this README._

| Tracker Tab | HandBook Viewer | Masterclass Countdown |
|---|---|---|
| ![Tracker screenshot](<img width="1908" height="956" alt="image" src="https://github.com/user-attachments/assets/de6deab7-b671-47d5-84fc-61a2b5e96f8a" />
) | ![HandBook screenshot](<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2e600108-7736-4d8d-9e68-cc1afc46460c" />
) | ![Masterclass screenshot](<img width="1919" height="989" alt="image" src="https://github.com/user-attachments/assets/b3b7ac69-e033-4c65-b53a-bb1c528b8ff4" />
) |

**To add your own:**
1. Create a `docs/screenshots/` folder in your project root.
2. Drop in PNG/JPG screenshots of each tab (Tracker, PDF Guide, HandBook, Masterclass, Sign-In).
3. For a quick animated demo, record a short clip with your OS screen recorder and convert it to a GIF (e.g. via [ezgif.com](https://ezgif.com/video-to-gif) or ScreenToGif), then reference it the same way:
   ```markdown
   ![App walkthrough](./docs/screenshots/demo.gif)
   ```
4. Keep each image under ~2MB so the README loads fast on GitHub.

---

## 🎯 What This Is

CTSTrack is a personal progress tracker for the **Cognizant Digital Nurture 5.0 — Python Full Stack Engineer** Deepskilling program. It mirrors the official handbook's 4 FSE Constructs and 10 Modules exactly — no invented timelines, no compressed deadlines, every duration and resource link is sourced directly from Cognizant's own handbook.

Just as importantly, this project was my way of **practicing what the DN5.0 Frontend module itself teaches** — HTML5 semantics, CSS layout systems, JavaScript ES6+, React components/hooks, and state management — by applying it to something I'd actually use every day during the program. Built and refined module by module, alongside the curriculum it tracks.

---

## ✨ Features

- **📅 Tracker Tab** — All 4 FSE Constructs and 10 Modules, laid out exactly per the official handbook durations. Each module expands into its real sub-topics or hands-on exercises, each backed by a direct learning link.
- **🔗 Click-to-Learn, Check-to-Complete** — Every sub-topic links out to the actual resource (GeeksforGeeks, official docs, W3Schools, MongoDB University, etc). Open the link, learn, come back, check the box.
- **🔄 Cascading Auto-Complete** — Check every link under a sub-topic → that sub-topic auto-completes. Finish every sub-topic in a module → the module auto-completes itself. No manual bookkeeping.
- **📘 PDF Guide Tab** — A quick-reference map of which modules have a dedicated Cognizant Hands-On PDF vs. GitHub-repo-only vs. SkillSpring-only content, so you're never hunting for a PDF that doesn't exist.
- **📖 HandBook Tab** — The official DN5.0 handbook and all hands-on PDFs open **inline**, directly inside the app — no download prompts, no tab-switching.
- **🗓️ Masterclass Tab** — A reminder countdown for scheduled cohort sessions: shows the date, day, and a live "Today / Tomorrow / in N days" countdown, with the nearest upcoming session visually prioritized at the top.
- **🎯 Focus Mode** — A toggle that strips visual distractions from the interface for heads-down study sessions.
- **🔐 Google Sign-In** — One-click auth via Firebase, no separate account or password to manage.
- **☁️ Cloud-Synced Progress** — Every checkbox is saved to Firestore in real time with optimistic UI (instant local feedback, background sync), and cached to `localStorage` as an offline fallback.
- **📱 Responsive** — Built desktop-first for laptop study sessions, fully usable on mobile.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Auth | Firebase Authentication (Google Sign-In) |
| Database | Cloud Firestore (per-user progress, optimistic writes) |
| File Storage | Firebase Storage (handbook PDFs) |
| Hosting | [Vercel](https://ctstracker.vercel.app/) |

---

## 🚀 Getting Started Locally

```bash
# Clone the repo
git clone https://github.com/yashvanthbalaji/cognizant-deepskilling-tracker.git
cd cognizant-deepskilling-tracker

# Install dependencies
npm install

# Add your own Firebase project config to src/firebase.js
# (see Firebase Setup below)

# Run the dev server
npm run dev
```

### Firebase Setup

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. Enable **Authentication → Google** sign-in provider.
3. Create a **Firestore Database** (production mode).
4. Create **Storage** and upload your handbook PDFs.
5. Copy your Web App config into `src/firebase.js`.
6. Lock down Firestore rules so users can only read/write their own progress document — see `firestore.rules` in this repo.

---

## 📂 Project Structure

```
src/
  firebase.js              — Firebase init (Auth, Firestore, Storage)
  context/AuthContext.jsx  — Google sign-in/sign-out state
  data/
    constructs.js          — 4 FSE Constructs, 10 Modules, sub-topics & links
    weeks.js                — Week-wise task checklist data
    meetings.js              — Masterclass session dates
  components/
    Header.jsx
    SignIn.jsx
    tabs/
      OfficialTimetable.jsx
      TaskChecklist.jsx
      PdfGuide.jsx
      HandbookViewer.jsx
      Masterclass.jsx
      GithubTab.jsx
```

---

## 🎓 Why I Built This

This project doubles as my **practical application of the Frontend Development module** in the very curriculum it tracks — HTML5 semantics, CSS Flexbox/Grid, JavaScript ES6+, React hooks and component architecture, and state management patterns, all of which are taught in **Module 6** of this same handbook. Rather than just completing the hands-on exercises in isolation, I built a real tool I'd use daily, and iterated on its UI/UX as I learned more.

All data, durations, and resource links in this app are sourced directly from the official Cognizant DN5.0 Deepskilling Handbook — nothing is invented or reordered.

---

## 📄 License

This is a personal learning project built for the Cognizant Digital Nurture 5.0 program. Not affiliated with or endorsed by Cognizant.

---

<div align="center">

**Built with 💙 during Cognizant Digital Nurture 5.0**

[Live Demo](https://ctstracker.vercel.app/) · [Report an Issue](https://github.com/yashvanthbalaji/cognizant-deepskilling-tracker/issues)

</div>
