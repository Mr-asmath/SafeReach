const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const projectDir = path.resolve(__dirname, "..");
const projectOut = path.join(projectDir, "out");
const projectNextBin = path.join(projectDir, "node_modules", "next", "dist", "bin", "next");
const runtimeDir = "C:\\SafeReachRuntime\\frontend";
const runtimeOut = path.join(runtimeDir, "out");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: projectDir,
    env: {
      ...process.env,
      GITHUB_PAGES: "true",
    },
    stdio: "inherit",
    shell: process.platform === "win32",
    ...options,
  });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if (typeof result.status === "number" && result.status !== 0) {
    process.exit(result.status);
  }
}

function copyDirectory(source, target) {
  fs.rmSync(target, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.cpSync(source, target, { recursive: true });
}

if (process.platform === "win32" && !fs.existsSync(projectNextBin)) {
  run("powershell", [
    "-ExecutionPolicy",
    "Bypass",
    "-File",
    path.join(projectDir, "scripts", "run-yarn-runtime.ps1"),
    "build",
  ]);

  if (!fs.existsSync(runtimeOut)) {
    console.error(`GitHub Pages export folder was not created: ${runtimeOut}`);
    process.exit(1);
  }

  copyDirectory(runtimeOut, projectOut);
} else {
  run(process.platform === "win32" ? "yarn.cmd" : "yarn", ["build"]);
}

if (!fs.existsSync(projectOut)) {
  console.error(`GitHub Pages export folder was not created: ${projectOut}`);
  process.exit(1);
}

console.log(`GitHub Pages static export created at ${projectOut}`);
