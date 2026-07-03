/**
 * Automated PR review checks beyond lint/typecheck — currently a minimal
 * starter. Extend with checks specific to this repo's known risk areas
 * (e.g. warn if a PR touches apps/mobile's session timer files without
 * touching a test file).
 */
const { danger, warn, message } = require("danger");

const bigPrThreshold = 600;
const changedLines =
  danger.github.pr.additions + danger.github.pr.deletions;

if (changedLines > bigPrThreshold) {
  warn(
    `This PR changes ${changedLines} lines — consider splitting it up for easier review.`
  );
}

const touchesSessionTimer = danger.git.modified_files.some((f) =>
  f.includes("apps/mobile/app/(app)/session.tsx")
);
const touchesTests = danger.git.modified_files.some((f) => f.includes(".test."));

if (touchesSessionTimer && !touchesTests) {
  warn(
    "This PR touches the guided-session timer without touching a test file — " +
      "see docs/01-product/journeys/core-flows.md §3, this is the highest-risk " +
      "regression area in the product."
  );
}

message("Thanks for the PR! See CONTRIBUTING.md for the pre-PR checklist.");
