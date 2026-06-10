const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");

const projectDir = path.resolve(__dirname, "..");
const runtimeDir = path.join(os.tmpdir(), "safereach-runtime-prod");
const runtimeOut = path.join(runtimeDir, "out");
const projectOut = path.join(projectDir, "out");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: projectDir,
    env: {
      ...process.env,
      GITHUB_PAGES: "true",
    },
    stdio: "inherit",
    shell: false,
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

run(process.execPath, [path.join(projectDir, "scripts", "run-next.cjs"), "build"]);

if (!fs.existsSync(runtimeOut)) {
  console.error(`GitHub Pages export folder was not created: ${runtimeOut}`);
  process.exit(1);
}

copyDirectory(runtimeOut, projectOut);
console.log(`GitHub Pages static export copied to ${projectOut}`);
