(function () {
  const app = document.getElementById("app");
  const score = document.getElementById("score");
  const submitted = new Map();

  function optionLabel(option) {
    return option.key + ". " + option.text;
  }

  function showError(message) {
    app.replaceChildren();
    const status = document.createElement("p");
    status.className = "status status-error";
    status.textContent = message;
    app.append(status);
    score.textContent = "题目没有载入";
  }

  function updateScore(total) {
    let passed = 0;
    submitted.forEach(function (correct) {
      if (correct) passed += 1;
    });
    if (submitted.size === 0) {
      score.textContent = "共 " + total + " 题 · 选出一项后点提交";
      return;
    }
    score.textContent = "通过 " + passed + " / " + total;
  }

  function fillResult(result, detail) {
    result.classList.toggle("is-pass", detail.correct);
    result.replaceChildren();

    const verdict = document.createElement("p");
    verdict.className = detail.correct ? "verdict verdict-pass" : "verdict verdict-fail";
    verdict.textContent = detail.correct ? "通过" : "未通过";

    const choice = document.createElement("p");
    choice.append("你的选择 ");
    const choiceStrong = document.createElement("strong");
    choiceStrong.textContent = detail.choice;
    choice.append(choiceStrong);

    const keyLine = document.createElement("p");
    keyLine.append("答案键 ");
    const keyStrong = document.createElement("strong");
    keyStrong.textContent = detail.key;
    keyLine.append(keyStrong);

    const explain = document.createElement("p");
    explain.className = "explain";
    const label = document.createElement("span");
    label.className = "explain-label";
    label.textContent = "解析";
    explain.append(label, document.createTextNode(" " + detail.explanation));

    result.append(verdict, choice, keyLine, explain);
    result.hidden = false;
  }

  function renderCard(question, index, total) {
    const article = document.createElement("article");
    article.className = "card";
    article.id = question.id;

    const kicker = document.createElement("p");
    kicker.className = "q-index";
    kicker.textContent = "第 " + (index + 1) + " 题 / " + total;

    const heading = document.createElement("h2");
    heading.textContent = question.question;

    const form = document.createElement("form");
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.className = "visually-hidden";
    legend.textContent = question.question;
    fieldset.append(legend);

    question.options.forEach(function (option) {
      const label = document.createElement("label");
      label.className = "option";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = question.id;
      input.value = option.key;
      const key = document.createElement("span");
      key.className = "option-key";
      key.textContent = option.key;
      const text = document.createElement("span");
      text.className = "option-text";
      text.textContent = option.text;
      label.append(input, key, text);
      fieldset.append(label);
    });

    const actions = document.createElement("div");
    actions.className = "actions";
    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "提交";
    const hint = document.createElement("p");
    hint.className = "hint";
    hint.setAttribute("role", "status");
    actions.append(button, hint);

    const result = document.createElement("div");
    result.className = "result";
    result.hidden = true;

    form.append(fieldset, actions);
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const selected = form.querySelector("input:checked");
      if (!selected) {
        hint.textContent = "请先选择一项。";
        return;
      }
      hint.textContent = "";
      const chosen = question.options.find(function (option) {
        return option.key === selected.value;
      });
      const keyed = question.options.find(function (option) {
        return option.key === question.answer;
      });
      const correct = selected.value === question.answer;
      fillResult(result, {
        correct: correct,
        choice: optionLabel(chosen),
        key: keyed ? optionLabel(keyed) : question.answer,
        explanation: question.explanation,
      });
      submitted.set(question.id, correct);
      updateScore(total);
    });

    article.append(kicker, heading, form, result);
    return article;
  }

  function focusHash() {
    const id = location.hash.replace(/^#/, "");
    if (!id) return;
    const card = document.getElementById(id);
    if (!card) return;
    card.scrollIntoView({ block: "start" });
  }

  function render(data) {
    const questions = Array.isArray(data.questions) ? data.questions : [];
    if (questions.length === 0) {
      showError("quiz.json 里没有题目。");
      return;
    }
    if (data.title) document.title = data.title;
    const list = document.createElement("div");
    list.className = "cards";
    questions.forEach(function (question, index) {
      list.append(renderCard(question, index, questions.length));
    });
    app.replaceChildren(list);
    updateScore(questions.length);
    focusHash();
  }

  fetch("quiz.json", { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("status " + response.status);
      }
      return response.json();
    })
    .then(render)
    .catch(function () {
      showError("读不到 quiz.json。请用静态服务器打开本页。");
    });

  window.addEventListener("hashchange", focusHash);
})();
