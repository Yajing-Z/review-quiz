# Demo

Two steps. First show the page failing an obviously correct choice. Then open a pull request that fixes the answer key.

`quiz.json` question `q2` asks which HTTP status means success. The options include **C. 200 OK（成功）**. The file marks **A** (404 Not Found) instead. Every explanation, including the one on `q2`, already states the real fact. Only `q2.answer` is wrong. Do not edit the explanation for this demo.

## 1. Misgrade, screenshot-ready

1. Open the live page after GitHub Pages (or another static host) is on:

   ```text
   https://<owner>.github.io/<repo>/#q2
   ```

   Locally, with `python3 -m http.server 8741` running in this directory:

   [http://127.0.0.1:8741/#q2](http://127.0.0.1:8741/#q2)

2. On question 2, **HTTP 状态码里，哪一个表示请求成功？**, choose **C. 200 OK（成功）**.
3. Press **提交**.
4. The card should show:
   - **未通过**
   - 你的选择 **C. 200 OK（成功）**
   - 答案键 **A. 404 Not Found（未找到）**
   - 解析 stating that 200 OK is the successful response

That mismatch is the screenshot. Leave `quiz.json` unchanged until the next step.

Keyed value today:

```json
"answer": "A"
```

The option a human should pick is `C`.

## 2. Fix `q2` in a pull request

1. In `quiz.json`, on the object with `"id": "q2"`, change the answer key:

   - before: `"answer": "A"`
   - after: `"answer": "C"`

2. Open a pull request. Put the before/after values and the page URL in the description, for example:

   ```markdown
   ## Fix Q2 answer key

   Question `q2` asks which HTTP status means success. The key marked 404.

   - before: `"answer": "A"`
   - after: `"answer": "C"`
   - page: https://<owner>.github.io/<repo>/#q2
   ```

   Replace the page line with the real Pages URL (or the static host URL) once you have it. See [README.md](README.md) for how that URL is formed.

3. After the change is deployed, hard-refresh `#q2`, choose **C. 200 OK（成功）** again, and submit. The verdict should be **通过**.

Choosing **A** before the fix is what the buggy key marks as correct, so that selection is graded **通过** even though 404 is not a success status. That is the same bug, from the other side.
