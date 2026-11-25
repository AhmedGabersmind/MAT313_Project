// Turn text like "x^4-11x+8" into a function of x
function makeFn(text) {
  let code = text.replaceAll("^", "**").replace(/(\d)x/g, "$1*x");
  return new Function("x", "return " + code + ";");
}

// Simple derivative helpers using a small step h
function df(f, x) {
  let h = 0.0001;
  return (f(x + h) - f(x - h)) / (2 * h);
}

function d2f(f, x) {
  let h = 0.001;
  return (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);
}

function calculate() {
  let f = makeFn(document.getElementById("fnInput").value);
  let x = parseFloat(document.getElementById("x0Input").value);
  let tbody = document.getElementById("tableBody");
  let result = document.getElementById("result");

  tbody.innerHTML = `<tr><td>0 (Initial guess)</td><td>${x.toFixed(8)}</td></tr>`;

  for (let i = 1; i <= 50; i++) {
    let xNext = x - f(x) / df(f, x);
    tbody.innerHTML += `<tr><td>${i}</td><td>${xNext.toFixed(8)}</td></tr>`;
    if (Math.abs(xNext - x) < 0.00000001) {
      result.textContent = "Root ≈ " + xNext.toFixed(8);
      return;
    }
    x = xNext;
  }
}

function checkGuess() {
  let f = makeFn(document.getElementById("fnInput").value);
  let x0 = parseFloat(document.getElementById("x0Input").value);
  let ratio = Math.abs((f(x0) * d2f(f, x0)) / (df(f, x0) ** 2));
  document.getElementById("result").textContent =
    ratio < 1 ? `converges (ratio = ${ratio.toFixed(4)})` : `doesn't converge (ratio = ${ratio.toFixed(4)})`;
}

// Fill the table right away when the page opens
calculate();