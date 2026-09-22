#!/bin/bash
# scripts/vercel-ignore-build.sh
# Enterprise Vercel Ignored Build Step for Monorepos.
# Exit code 1: Proceed with build.
# Exit code 0: Cancel / ignore build.

REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
TARGET_DIR="${1:-.}"

echo ":: [Vercel Ignore] Evaluating build trigger for: $TARGET_DIR"
echo ":: [Vercel Ignore] Repository root: $REPO_ROOT"
echo ":: [Vercel Ignore] Current branch / ref: ${VERCEL_GIT_COMMIT_REF:-local}"

# If HEAD^ cannot be resolved (initial commit or shallow clone), build to be safe
if ! git rev-parse --verify HEAD^ >/dev/null 2>&1; then
  echo ":: [Vercel Ignore] Initial commit or shallow clone detected. Proceeding with build."
  exit 1
fi

# Compare current commit with previous commit for target directory and root package files
if git diff --quiet HEAD^ HEAD -- "$TARGET_DIR" "$REPO_ROOT/package.json" "$REPO_ROOT/package-lock.json"; then
  echo ":: [Vercel Ignore] No changes detected in $TARGET_DIR or root package files. Build cancelled."
  exit 0
else
  echo ":: [Vercel Ignore] Changes detected in $TARGET_DIR or root package files. Proceeding with build."
  exit 1
fi
