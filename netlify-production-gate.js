// Netlify production safety gate.
// Exit 0 from an ignore command = skip the build.
// Exit 1 = continue the build.
//
// Production deploys are allowed ONLY when the latest commit message
// contains the exact token: [deploy production]

const { execSync } = require("child_process");

let message = "";
try {
  message = execSync("git log -1 --pretty=%B", { encoding: "utf8" });
} catch (error) {
  console.log("Could not read commit message. Blocking production deploy by default.");
  process.exit(0);
}

if (/\[deploy production\]/i.test(message)) {
  console.log("Explicit production release token found. Production deploy allowed.");
  process.exit(1);
}

console.log("Production deploy blocked by Reading Radar safety gate.");
console.log("To release deliberately, use a commit message containing [deploy production].");
process.exit(0);
