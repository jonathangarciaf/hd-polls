/**
 * Backend for the hd-polls pages: stores answers in the Google Sheet this
 * script is bound to, and returns them as JSON for the results page.
 *
 * Setup (once): Extensions > Apps Script in a new Google Sheet, paste this
 * file, Deploy > New deployment > Web app, Execute as: Me, Who has access:
 * Anyone. Copy the /exec URL into config.js.
 */

const SHEET_NAME = 'responses';

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['timestamp', 'poll', 'question', 'answer', 'respondent']);
  }
  return sh;
}

// One row per answer. Body is JSON sent as text/plain to avoid a CORS preflight.
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const sh = sheet_();
    const now = new Date();
    (d.answers || []).forEach(function (a) {
      const text = String(a.answer || '').trim().slice(0, 60);
      if (text) sh.appendRow([now, String(d.poll).slice(0, 40), String(a.question).slice(0, 40), text, String(d.respondent || '').slice(0, 40)]);
    });
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// ?poll=w2 returns every answer for that poll.
function doGet(e) {
  const poll = (e.parameter.poll || '').toString();
  const rows = sheet_().getDataRange().getValues().slice(1)
    .filter(function (r) { return r[1] === poll; })
    .map(function (r) { return { question: r[2], answer: r[3] }; });
  return json_({ poll: poll, n: rows.length, rows: rows });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
