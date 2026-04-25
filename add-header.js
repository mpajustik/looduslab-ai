const fs = require("fs");
const path = require("path");

const simulationsDir = path.join(__dirname, "simulations");

const headerHtml = `
<!-- LoodusLab AI ühine päis -->
<header class="ll-header">
  <div class="ll-header-inner">
    <a href="../index.html" class="ll-brand">LoodusLab AI</a>
    <a href="../index.html#simulatsioonid" class="ll-back">← Tagasi simulatsioonide juurde</a>
  </div>
</header>
`;

const headerCss = `
<style id="looduslab-header-style">
  .ll-header {
    width: 100%;
    background: linear-gradient(135deg, #0f766e, #2563eb);
    color: white;
    padding: 14px 20px;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
    position: sticky;
    top: 0;
    z-index: 9999;
    box-shadow: 0 6px 18px rgba(0,0,0,0.16);
  }

  .ll-header-inner {
    max-width: 1180px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .ll-brand,
  .ll-back {
    color: white;
    text-decoration: none;
    font-weight: 800;
  }

  .ll-brand {
    font-size: 1.15rem;
  }

  .ll-back {
    font-size: 0.95rem;
    opacity: 0.95;
  }

  .ll-back:hover {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    .ll-header-inner {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
`;

function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  if (content.includes("LoodusLab AI ühine päis")) {
    console.log(`Juba olemas: ${filePath}`);
    return;
  }

  // Lisa CSS enne </head>
  if (content.includes("</head>")) {
    content = content.replace("</head>", `${headerCss}\n</head>`);
  } else {
    console.log(`Hoiatus: </head> puudub failis ${filePath}`);
  }

  // Lisa päis kohe pärast <body>
  if (content.includes("<body>")) {
    content = content.replace("<body>", `<body>\n${headerHtml}`);
  } else if (content.match(/<body[^>]*>/i)) {
    content = content.replace(
      /<body[^>]*>/i,
      (match) => `${match}\n${headerHtml}`,
    );
  } else {
    console.log(`Hoiatus: <body> puudub failis ${filePath}`);
    return;
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Lisatud päis: ${filePath}`);
}

function run() {
  if (!fs.existsSync(simulationsDir)) {
    console.error("Kausta simulations ei leitud.");
    return;
  }

  const files = fs
    .readdirSync(simulationsDir)
    .filter((file) => file.endsWith(".html"));

  files.forEach((file) => {
    const filePath = path.join(simulationsDir, file);
    processHtmlFile(filePath);
  });

  console.log("Valmis.");
}

run();
