#!/usr/bin/env node
"use strict";

// Bumps the version in src/version.js based on Conventional Commit messages pushed in this
// deploy, following semver: a breaking change bumps major, "feat:" bumps minor, anything else
// (including "fix:") bumps patch — so the version always advances on every deploy.

const fs = require("fs");
const { execSync } = require("child_process");

const VERSION_FILE = "src/version.js";
const NULL_COMMIT = /^0+$/;

function getPushedCommitMessages() {
  const before = process.env.COMMIT_RANGE_BEFORE || "";
  const after = process.env.COMMIT_RANGE_AFTER || "HEAD";
  const range = before && !NULL_COMMIT.test(before) ? `${before}..${after}` : after;
  const raw = execSync(`git log ${range} --pretty=format:%B%x00`, { encoding: "utf8" });
  return raw
    .split("\x00")
    .map((message) => message.trim())
    .filter(Boolean);
}

function detectBumpLevel(messages) {
  const isBreaking = (message) =>
    /BREAKING CHANGE/.test(message) || /^\w+(\([^)]*\))?!:/.test(message);
  const isFeature = (message) => /^feat(\([^)]*\))?:/.test(message);

  if (messages.some(isBreaking)) {
    return "major";
  }
  if (messages.some(isFeature)) {
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

const content = fs.readFileSync(VERSION_FILE, "utf8");
const [, current] = content.match(/APP_VERSION\s*=\s*"(\d+\.\d+\.\d+)"/);
const level = detectBumpLevel(getPushedCommitMessages());
const next = bumpVersion(current, level);

fs.writeFileSync(VERSION_FILE, content.replace(current, next));
console.log(`Bumped version ${current} -> ${next} (${level})`);
