# 🎓 RHCSA Master — Pass in 2 Weeks

> **A complete, offline-first, interactive e-learning platform for the Red Hat Certified System Administrator (RHCSA) EX200 certification.**

Built with pure HTML, CSS, and JavaScript — no framework, no backend, no installation required. Open `index.html` and start studying.

---

## 📸 Preview

```
┌─────────────────────────────────────────────────────────────┐
│  RHCSA.MASTER          [Dashboard] [Plan] [Labs] [Exam]     │
│  ─────────────                                              │
│   Dashboard     │   Master Linux.                           │
│   2-Week Plan   │   Pass in 2 Weeks .                       │
│   Definitions   │                                           │
│  ─────────────    │   12 Domains · 14 Labs · 50 Quiz Q's    │
│    Essentials   │   10 VM Exercises · Mock Exam             │
│   Users         │                                           │
│   Permissions   │   [Start Labs] [Quiz] [Mock Exam]         │
│   Storage/LVM   │                                           │
│    SELinux      │   Mohamed TAIEB                           │
│   Boot/Recovery │   mohamed.taieb.gl@gmail.com              │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

| Module | Description |
|--------|-------------|
| 🏠 **Dashboard** | Overview of all 12 RHCSA domains with exam weight |
| 📅 **2-Week Study Plan** | Day-by-day schedule with clickable progress tracking |
| 📖 **Key Definitions** | 45+ searchable RHCSA terms and concepts |
| ⚙️ **12 Domain Pages** | Full command reference with tabs, tables, and code examples |
| 🔬 **14 Hands-on Labs** | Guided exercises with hints, hidden solutions, and validation commands |
| 🖥️ **TP Zone (VM Exercises)** | 10 standalone exercises to run on your RHEL 9 VM, with hidden corrections |
| 🧠 **Knowledge Quiz** | 50 questions across all domains, filterable by domain, with instant feedback |
| ⏱️ **Mock Exam** | 30 questions, 45-minute countdown, PASS/FAIL result (70% threshold) |
| 📋 **Cheat Sheet** | Critical commands for every domain — print and keep it visible |

---

## 📚 RHCSA Domains Covered

All 12 official EX200 domains are fully covered:

| # | Domain | Exam Weight |
|---|--------|-------------|
| 01 | Essential Tools (shell, vim, grep, find, I/O, tar) | ~15% |
| 02 | Users & Groups (useradd, passwd, chage, sudo) | ~10% |
| 03 | Permissions & ACL (chmod, SUID/SGID/Sticky, setfacl) | ~10% |
| 04 | Storage & LVM (fdisk, LVM full workflow, fstab, NFS, autofs, swap) | ~20% |
| 05 | Processes & Jobs (ps, kill, nice, cron, at, systemd timers) | ~8% |
| 06 | Networking (nmcli, ip, ss, hostnamectl, DNS) | ~10% |
| 07 | Services & systemd (systemctl, journalctl, custom units) | ~10% |
| 08 | Software Management (dnf, rpm, repos, AppStream modules) | ~8% |
| 09 | SELinux & Firewall (semanage, restorecon, setsebool, firewall-cmd) | ~12% |
| 10 | Bash Scripting (variables, loops, functions, error handling) | ~5% |
| 11 | Containers — Podman (rootless, volumes, systemd service) | ~5% |
| 12 | Boot & Recovery (GRUB2, root password reset, rescue mode) | ~7% |

---

## 🚀 Getting Started

### Option 1 — VS Code + Live Server (Recommended for Windows)

```bash
# 1. Clone the repository
git clone https://github.com/MohamedTaiebgl/RHCSA.git
cd rhcsa-master

# 2. Open in VS Code
code .

# 3. Right-click index.html → "Open with Live Server"
#    (Install the Live Server extension if not already installed)
```

### Option 2 — Open directly in browser

```bash
# Simply double-click index.html
# Or open it with your browser:
start index.html          # Windows
open index.html           # macOS
xdg-open index.html       # Linux
```

### Option 3 — Python HTTP server

```bash
git clone https://github.com/MohamedTaiebgl/RHCSA.git
cd rhcsa-master
python -m http.server 8080
# Then open: http://localhost:8080
```

### Option 4 — Deploy on GitHub Pages

1. Fork this repository
2. Go to **Settings → Pages**
3. Set source to **main branch / root**
4. Access at `https://mohamedtaiebgl.github.io/RHCSA/`

---

## 📁 Project Structure

```
rhcsa-master/
├── index.html                           # Single entry point (SPA shell)
├── css/
│   └── style.css                        # Complete dark theme stylesheet
├── js/
│   ├── data.js                          # All data: definitions, plan, quiz, labs, TP
│   ├── pages-core.js                    # Home, Plan, Definitions, Cheat Sheet pages
│   ├── pages-domains.js                 # All 12 RHCSA domain pages
│   ├── pages-practice.js                # Labs, TP Zone, Quiz, Mock Exam logic
│   └── app.js                           # SPA router, navigation, keyboard shortcuts
├── Cahier_des_Charges_RHCSA_Master.docx # Project specifications (French)
└── README.md                            # This file
```

**No build step. No npm install. No dependencies.** Just static files.

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| **HTML5** | Single-page shell with semantic structure |
| **CSS3** | Custom dark theme with CSS variables, responsive layout |
| **Vanilla JavaScript ES6+** | SPA router, DOM rendering, quiz/exam logic |
| **localStorage** | Persist plan progress, lab completion, TP completion |
| **Google Fonts CDN** | JetBrains Mono (code) + Syne (headings) |

Zero frameworks. Zero build tools. Zero runtime dependencies.

---

## 🧩 How It Works

The app is a **Single Page Application (SPA)** built without any framework:

- **Router**: `navigate(page)` function renders the correct page into `#page-content`
- **URL sync**: Fragment hash (`#page`) enables browser back button and bookmarking
- **Data layer**: All content lives in `js/data.js` as plain JavaScript arrays/objects
- **Persistence**: `localStorage` stores completed days, labs, and TPs across sessions
- **No server required**: Works from `file://` or any HTTP server

---

## 📖 How to Use

### Daily Study Flow
1. Open the **2-Week Plan** and follow the daily schedule
2. Read the **Domain page** for the day's topic (commands + examples)
3. Check the corresponding **Definitions** entries
4. Do the **Hands-on Lab** for that domain (try without hints first!)
5. Do the **TP Zone** exercise on your RHEL 9 VM
6. Take the **Quiz** filtered to that domain

### Before the Exam
1. Run the **Mock Exam** under timed conditions
2. Review every wrong answer
3. Redo any labs you failed
4. Print the **Cheat Sheet**

---

## 💡 Study Tips

> ⚠️ **The real RHCSA exam is 3 hours of hands-on work on a live RHEL 9 system — no multiple choice.** Reading is not enough. You must type every command yourself.

- **Get a VM**: Use RHEL 9 (free developer account at developers.redhat.com) or CentOS Stream 9
- **LVM + SELinux first**: These are the most common failure points — spend extra time here
- **Never disable SELinux**: Doing this in the exam = automatic failure
- **Test fstab**: Always run `mount -a` before rebooting after editing `/etc/fstab`
- **Memorize root password reset**: It's always on the exam — 8 steps, no notes allowed

---

## 📊 Content Statistics

| Content Type | Count |
|-------------|-------|
| RHCSA domains covered | 12 / 12 |
| Commands documented | 250+ |
| Key definitions | 45 |
| Hands-on labs | 14 |
| Lab tasks total | 100+ |
| VM exercises (TP Zone) | 10 sessions / 40+ exercises |
| Quiz questions | 50 |
| Mock exam questions | 30 |
| Study plan days | 14 |

---

## 🖥️ Browser Compatibility

| Browser | Supported |
|---------|-----------|
| Chrome 90+ | ✅ Full support |
| Firefox 88+ | ✅ Full support |
| Edge 90+ | ✅ Full support |
| Safari 14+ | ✅ Full support |
| Mobile (iOS/Android) | ✅ Responsive layout |

---

## 🤝 Contributing

Contributions are welcome! Here's how to help:

1. **Fork** this repository
2. **Create** a feature branch: `git checkout -b feature/add-more-quiz-questions`
3. **Commit** your changes: `git commit -m "Add 10 new SELinux quiz questions"`
4. **Push** to the branch: `git push origin feature/add-more-quiz-questions`
5. **Open a Pull Request**

### Ideas for contributions
- Add more quiz questions (especially for containers and scripting)
- Add more TP exercises for specific domains
- Translate content to other languages
- Add dark/light theme toggle
- Add a flashcard mode for definitions

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

```
MIT License — Copyright (c) 2025 Mohamed TAIEB
```

---

## 👤 Author

**Mohamed TAIEB**

- 📧 Email: [mohamed.taieb.gl@gmail.com](mailto:mohamed.taieb.gl@gmail.com)
- 🐙 GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)

---

## ⭐ Support

If this project helped you prepare for or pass your RHCSA exam — give it a ⭐ on GitHub!

---

<div align="center">

**Good luck on your RHCSA exam!** 🎓

*Red Hat Enterprise Linux 9 · EX200 · Certification RHCSA*

</div>
