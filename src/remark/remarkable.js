var remarkable = module.exports = {};

remarkable.process = function () {
  var codeblocks = document.getElementsByClassName("js hljs javascript remark-code");
  for (var i = 0; i < codeblocks.length; i++) {
    codeblocks[i].addEventListener("click", handleCodeBlockClick);
  }

  function handleCodeBlockClick(e) {
    var codeblock = e.currentTarget;
    var codeText = toText(codeblock);

    while (codeblock.parentNode.childNodes.length > 1) {
      codeblock.parentNode.removeChild(codeblock.parentNode.childNodes[1]);
    }

    var output = document.createElement("code");
    output.classList.add("js");
    output.classList.add("hljs");
    output.classList.add("javascript");
    output.classList.add("remark-code");

    var hasOutput = false;
    function appendOutput() {
      hasOutput = true;
      var line = "";
      for (var i = 0; i < arguments.length; i++) {
        line += "" + arguments[i] + " ";
      }
      var el = document.createElement("div");
      el.classList.add("remark-code-line");
      el.textContent = line;
      output.appendChild(el);
    }

    // keep hold of the original console.log and replace it with
    // a DOM manipulator so output appears on the page.
    var originalLog = console.log;
    console.log = appendOutput;

    // run the code and see if there's any console output.
    eval(codeText);
    if (hasOutput) {
      codeblock.parentNode.appendChild(output);
    }

    // reset console.log to it's original function.
    console.log = originalLog;
  }

  function toText(node) {
    if (node.childNodes.length === 0) {
  	  return node.textContent;
    }

    var text = "";
    for (var i = 0; i < node.childNodes.length; i++) {
      text += toText(node.childNodes[i]);
    }
    return text;
  }
};
