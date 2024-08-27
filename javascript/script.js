/********** ELEMENTS **********/
const elements = {
    body: document.querySelector("body"),
    navbar: document.querySelector(".navbar"),
    open_spotlight: document.querySelector(".open_Search"),
    spotlight_search: document.querySelector(".spotlight_serach"),
    brightness_range: document.getElementById("brightness"),
    sound_range: document.getElementById("sound"),
    clockElement: document.getElementById("clock"),
    clockWrapper: document.querySelector(".clock"),
    widgetsPanel: document.querySelector(".widgets-panel"),
    batteryButton: document.querySelector(".battery"),
    batteryText: document.querySelector(".battery__text"),
    batteryPopup: document.querySelector(".battery__popup"),
    batteryPopupText: document.querySelector(".battery__popup header span"),
    batteryProgress: document.querySelector(".battery__progress"),
    batteryIsChargingLogo: document.querySelector(".is-charging"),
    powerSource: document.querySelector(".power-source"),
  };

// Terminal App
const terminalApp = {
    app_name: document.querySelector("#Terminal"),
    window: document.querySelector(".terminal"),
    full: document.querySelector(".full"),
    close: document.querySelector(".close"),
    backfull: document.querySelector(".backfull"),
    point: document.querySelector("#point-terminal"),
    content: document.querySelector(".terminal .terminal_content"),
    taskbar: document.querySelector(".terminal .window__taskbar"),
    opening: document.querySelector(".open-terminal")
};

// Maps App
const mapsApp = {
    app_name: document.querySelector("#map"),
    window: document.querySelector(".maps"),
    full: document.querySelector(".full-map"),
    close: document.querySelector(".close-map"),
    backfull: document.querySelector(".backfull-map"),
    point: document.querySelector("#point-maps"),
    opening: document.querySelector(".open-map")
  };

// Launchpad
const launchpad = {
    container: document.querySelector(".container__Window"),
    window: document.querySelector(".launchpad"),
    searchbox: document.querySelector(".launchpad .searchbox"),
    app_container: document.querySelector(".Apps-container"),
    point: document.querySelector("#point-launchpad"),
    opening: document.querySelector(".open-lunchpad")
  };
  
  function handleMinimize(Minimize) {
    Minimize.style.maxWidth = "80%";
    Minimize.style.minWidth = "70%";
    Minimize.style.height = "430px";
  }
  
  function handleFullScreen(maximize) {
    maximize.style.maxWidth = "95%";
    maximize.style.minWidth = "95%";
    maximize.style.height = "90%";
  }
  
  function close_window(close, point, appName) {
    close.style.display = "none";
    point.style.display = "none";
    appName.style.display = "none";
  }
  
  function open_window(open, point, appName) {
    elements.navbar.style.display = "flex";
    open.style.display = "block";
    launchpad.container.style.display = "flex";
    launchpad.window.style.display = "none";
    launchpad.point.style.display = "none";
    appName.style.display = "block";
    point.style.display = "block";
  }

  // Launchpad function start
launchpad.opening.addEventListener("click", handleOpenLaunching);

function handleOpenLaunching() {
  if (launchpad.window.style.display === "none") {
    launchpad.window.style.display = "block";
    elements.navbar.style.display = "none";
    launchpad.point.style.display = "block";
  } else {
    launchpad.window.style.display = "none";
    elements.navbar.style.display = "flex";
    launchpad.point.style.display = "none";
  }
  launchpad.container.style.display = "none";
}

function handleLaunchpadSearch(e) {
  for (let app of launchpad.app_container.children) {
    if (e.target.value) {
      app.style.display = "none";
      if (app.dataset.keywords.includes(e.target.value)) {
        app.style.display = "flex";
      }
    } else app.style.display = "flex";
  }
}
// Launchpad function end

handleOpenLaunching();

terminalApp.close.addEventListener("click", () =>
    close_window(terminalApp.window, terminalApp.point, terminalApp.app_name)
);

terminalApp.full.addEventListener("click", () =>
    handleFullScreen(terminalApp.window)
);

terminalApp.opening.addEventListener("click", () =>
  open_window(terminalApp.window, terminalApp.point, terminalApp.app_name)
);

  // App draggable
$(function () {
    $(".terminal").draggable();
    $(".note").draggable();
    $(".calculator").draggable();
    $(".Vscode").draggable();
    $(".spotlight_serach").draggable();
    $(".maps").draggable();
  });

  let terminal_line_html = $(".terminal_line").html();
let path = "~";
let dirName;
let dirs = ["Desktop", "Downloads", "Music", "Documents"];

function init_terminal_line() {
  $(".cursor").keydown(function (e) {
    // trap the return key being pressed
    if (e.keyCode === 13) {
      e.preventDefault();
      let command = $(this).html();
      if (!command) return;
      let command_output = "zsh: command not found: " + command + "<br>";

      if (command.startsWith("cd ")) {
        path = command.substring(3);
        command_output = "";
      } else if (command === "ls") {
        command_output = dirs.join("\t");
      } else if (command === "pwd") {
        command_output = path + "/";
      } else if (command.startsWith("mkdir ")) {
        dirName = command.substring(6);
        dirs.push(dirName);
        command_output = "";
      } else if (command === "rmdir") {
        dirs.pop();
        command_output = "";
      } else if (command === "ps -aux") {
        command_output = "CPU = 56% <br> MEMORY = 25% <br> DISK = 34%";
      } else if (command.startsWith("cat ")) {
        command_output =
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.<br> Fugiat nihil totam expedita sint necessitatibus quos ducimus.";
      } else if (command.startsWith("du -hs ")) {
        command_output = Math.floor(Math.random() * 100) + "GB";
      }

      $(this).removeAttr("contenteditable");
      $(this).removeClass("cursor");
      terminalApp.content
        .append(command_output)
        .append(terminal_line_html.replace("~", path));
      placeCaretAtEnd(document.querySelector(".cursor"));
      init_terminal_line();
    }
  });
}

init_terminal_line();
terminalApp.content.addEventListener("click", function () {
  placeCaretAtEnd(document.querySelector(".cursor"));
});

function placeCaretAtEnd(el) {
    el.focus();
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }