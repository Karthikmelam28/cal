const result = document.getElementById("result");
const historyDiv = document.getElementById("history");
const buttons = document.querySelectorAll(".btn");
const toggleTheme = document.getElementById("toggle-theme");

let history = "";
let expression = "";

// Handle button clicks
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (btn.id === "clear") {
      expression = "";
      result.value = "";
      history = "";
      historyDiv.textContent = "";
    } else if (btn.id === "backspace") {
      expression = expression.slice(0, -1);
      result.value = expression;
    } else if (btn.classList.contains("equal")) {
      try {
        let evalResult = eval(expression);
        history = expression;
        expression = evalResult.toString();
        result.value = expression;
        historyDiv.textContent = history;
      } catch {
        result.value = "Error";
        expression = "";
      }
    } else {
      expression += value;
      result.value = expression;
    }
  });
});

// Keyboard support
document.addEventListener("keydown", e => {
  if ((e.key >= "0" && e.key <= "9") || ["+", "-", "*", "/", "."].includes(e.key)) {
    expression += e.key;
    result.value = expression;
  } else if (e.key === "Enter") {
    try {
      let evalResult = eval(expression);
      history = expression;
      expression = evalResult.toString();
      result.value = expression;
      historyDiv.textContent = history;
    } catch {
      result.value = "Error";
      expression = "";
    }
  } else if (e.key === "Backspace") {
    expression = expression.slice(0, -1);
    result.value = expression;
  } else if (e.key === "Escape") {
    expression = "";
    result.value = "";
    historyDiv.textContent = "";
  }
});

// Dark/Light mode toggle
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleTheme.textContent = document.body.classList.contains("dark") ? "☀" : "🌙";
});