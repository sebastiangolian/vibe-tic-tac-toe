#!/usr/bin/env node
"use strict";

// Bumps src/version.js based on the message of the commit that was just created.
// Invoked by the `post-commit` hook (see .githooks/post-commit / core.hooksPath), which folds
// the bump into that same commit via `git commit --amend`, following semver:
// a breaking change bumps major, "feat:" bumps minor, anything else bumps patch.

const fs = require("fs");
const { execSync } = require("child_process");

const VERSION_FILE = "src/version.js";

function detectBumpLevel(message) {
  const isBreaking = /BREAKING CHANGE/.test(message) || /^\w+(\([^)]*\))?!:/.test(message);
  const isFeature = /^feat(\([^)]*\))?:/.test(message);

  if (isBreaking) {
    return "major";
  }
  if (isFeature) {
    return "minor";
  }
  return "patch";
}

function bumpVersion(current, level) {
  const [major, minor, patch] = current.split(".").map(Number);

  if (level === "major") {
    return `${major + 1}.0.0`;
  }
  if (level === "minor") {
    return `${major}.${minor + 1}.0`;
  }
  return `${major}.${minor}.${patch + 1}`;
}

const message = execSync("git log -1 --pretty=%B HEAD", { encoding: "utf8" }).trim();
const content = fs.readFileSync(VERSION_FILE, "utf8");
const [, current] = content.match(/APP_VERSION\s*=\s*"(\d+\.\d+\.\d+)"/);
const level = detectBumpLevel(message);
const next = bumpVersion(current, level);

fs.writeFileSync(VERSION_FILE, content.replace(current, next));
console.log(`Bumped version ${current} -> ${next} (${level})`);
