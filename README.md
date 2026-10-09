# 代码复习小测

Static review quiz. The page is plain HTML, CSS, and JavaScript. It reads `quiz.json` in the browser and grades the selected option against that file’s `answer` field. There is no build step, no account, and no backend.

## Files

| File | Role |
| --- | --- |
| `index.html` | Page shell |
| `styles.css` | Layout and result styles |
| `quiz.js` | Loads the quiz, renders each question, grades on **提交** |
| `quiz.json` | Questions, options, answer keys, and explanations |
| `.nojekyll` | Tells GitHub Pages to skip Jekyll and serve these files as-is |
| `DEMO.md` | Walkthrough for the question 2 answer key |

## Local preview

From this directory:

```bash
python3 -m http.server 8741
```

Open [http://127.0.0.1:8741/](http://127.0.0.1:8741/). Question 2 is [http://127.0.0.1:8741/#q2](http://127.0.0.1:8741/#q2).

`fetch` needs HTTP. Opening `index.html` as a `file://` URL will not load `quiz.json`.

## GitHub Pages

The site is published from the `main` branch, folder `/` (the repository root).

GitHub Pages builds the public URL from the repository owner and name, both lowercased:

```text
https://<owner>.github.io/<repo>/
```

For this repository that is:

https://yajing-z.github.io/review-quiz/

A question id in the hash opens that card. Question 2:

https://yajing-z.github.io/review-quiz/#q2

## Grading

Each card compares the chosen option key to `answer` in `quiz.json`. The explanation is shown after submit and is not used as the key. See [DEMO.md](DEMO.md) for the review walkthrough.
