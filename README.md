# hd-polls

Slido-style class polls for the Human Development course (HU Berlin, WiSe 2026/27).

- Students: `https://jonathangarciaf.github.io/hd-polls/survey.html?poll=w2` (behind the QR on the slide)
- Lecturer screen: `https://jonathangarciaf.github.io/hd-polls/results.html?poll=w2` (live word cloud + bar chart, refreshes every 5 s)

Answers are stored in a Google Sheet through a small Apps Script web app (`apps_script/Code.gs`).

## One-time setup (about 5 minutes)

1. Create a new Google Sheet (e.g. "hd-polls responses").
2. Extensions > Apps Script. Replace the editor content with `apps_script/Code.gs` and save.
3. Deploy > New deployment > type **Web app**. Set Execute as **Me** and Who has access **Anyone**. Deploy, then authorise.
4. Copy the URL ending in `/exec` into `SCRIPT_URL` in `config.js`. Commit and push.

## Adding a poll for another week

Add an entry to `POLLS` in `config.js` (e.g. `w3`), then point the QR at `survey.html?poll=w3`.

To reset a poll, delete its rows in the Sheet. Each phone can answer once per poll (stored in the browser).
