# dsh-ielts-pets

An ambient IELTS vocabulary pet for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) web UI. A small cat, dog or capybara sits in the bottom-right corner of the conversation, offers one word at a time, and schedules each word to come back according to your own "Know it / Not yet" answer.

It is a client-side plugin. The host half (`index.js`) does nothing; all study state lives in the browser's `localStorage`, and the bundle makes no network requests.

## Install

```sh
dsh plugin --profile web add github:zhai90/ielts-pets
```

In DSH Desktop, install the same `github:zhai90/ielts-pets` spec through the app's own plugin manager (its profile is usually called `desktop`).

The package is not published to npm, so this repository is the install source. There is no build step: `client.js` is already the bundle. Reload the page (or restart `dsh web`) afterwards.

## What you get

- **Three pet styles** — cat, dog and capybara. The head turns toward the mouse pointer, and a small button in the corner brings the pet back after you minimize it.
- **120 built-in IELTS words**, each with part of speech, Chinese gloss, an English example sentence and its Chinese translation. The target word is highlighted inside its example.
- **Self-check scheduling.** *Know it* raises the card's familiarity level (0–5) and sets the next visit 1, 3, 7, 14, 30 or 60 days out. *Not yet* lowers the level and brings the word back after 45 seconds, 2 minutes or 10 minutes, depending on how many times it has lapsed.
- **A daily new-word limit** from 1 to 100 (default 20); the next round starts the next day. When nothing is due, the pet says so instead of inventing work.
- **Auto pop** — after 1, 3, 5, 10 or 15 idle minutes (default 3) the pet offers a word by itself. Can be switched off.
- **Pronunciation** — the speaker button reads the current word with the browser's speech synthesis.
- **Custom word lists** — import a CSV or JSON file; imported words join the daily queue and the result reports how many were imported and how many were skipped.
- **Progress** — new words today, reviews today, familiar words, words waiting for review, and a progress bar for today's goal. The last answer can be undone.
- **Bilingual UI** that follows the harness language (English / 简体中文).

## Keyboard

| Key | Where | Action |
| --- | --- | --- |
| `←` | question | Not yet |
| `→` | question | Know it |
| `→` / `Enter` | answer shown | Next word |
| `←` | answer shown | Change the last answer |
| `↓` | any card | Undo the last answer, or minimize the pet when there is nothing to undo |
| `↓` | settings | Close settings |
| `Enter` | round complete | Keep reviewing |

Keys are ignored while the focus is in an input, a textarea, a select or any editable element.

## Custom word lists

### CSV

The header row is optional. Recognized column names (case, spaces, `_` and `-` are ignored):

| Field | Accepted names |
| --- | --- |
| word (required) | `word`, `term`, `单词`, `英文`, `词汇` |
| part of speech | `pos`, `part of speech`, `词性` |
| meaning (required) | `meaning`, `definition`, `释义`, `中文`, `中文释义`, `意思`, `解释` |
| example | `example`, `sentence`, `例句` |
| example translation | `translation`, `例句翻译`, `例句中文`, `翻译` |

Without a header the column order is `word, pos, meaning, example, translation`.

```csv
word,pos,meaning,example,translation
abandon,v.,放弃；抛弃,Many students abandon their study plans when motivation drops.,当动力下降时，许多学生会放弃自己的学习计划。
```

### JSON

An array of objects, or an object holding a `words` or `data` array. Field names follow the same aliases as the CSV header.

```json
[
  {
    "word": "abandon",
    "pos": "v.",
    "meaning": "放弃；抛弃",
    "example": "Many students abandon their study plans when motivation drops.",
    "translation": "当动力下降时，许多学生会放弃自己的学习计划。"
  }
]
```

A row with no word or no meaning is skipped. Values are truncated to 80 characters for the word, 24 for the part of speech and 600 for the example and its translation.

## Settings

- **Daily new-word limit** — 1 to 100.
- **Pet style** — cat, dog or capybara.
- **Pop-up interval** — 1 / 3 / 5 / 10 / 15 minutes.
- **Pop up automatically** — on or off.
- **Custom words** — import, count and clear the imported list (clearing also drops those words' study records).

## Where the data lives

Everything — settings, per-word cards (`seen`, `known`, `unknown`, `level`, `nextDueAt`) and imported words — is stored under the `localStorage` key `dsh.ielts-pet.v1`. Nothing is uploaded, and `client.js` contains no `fetch`, `XMLHttpRequest` or `WebSocket` call. Clearing the site data resets the pet.

## Requirements

A DSH web client. The client half registers through `window.__ModuleLoader__.load` and renders into the conversation view (`@deepseek-ai/dsh-client-ui-conversation`), so it needs a host that serves that slot; it was written against DSH 0.2.x.

## Development

No build step and no dependencies: `index.js` is an empty host plugin, `client.js` is the whole client bundle (plain JS, React taken from the host), and `locale/*.json` holds the manifest title and description. Edit, then reload the page.

## License

MIT
