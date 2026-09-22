#!/bin/bash
# scripts/vercel-ignore-build.sh
# Enterprise Vercel Ignored Build Step for Monorepos.
# Exit code 1: Proceed with build.
# Exit code 0: Cancel / ignore build.

TARGET_DIR="$1"

if [ -z "$TARGET_DIR" ]; then
  echo ":: [Vercel Ignore] No target directory specified. Proceeding with build."
  exit 1
fi

echo ":: [Vercel Ignore] Evaluating build trigger for directory: $TARGET_DIR"
echo ":: [Vercel Ignore] Current branch / ref: ${VERCEL_GIT_COMMIT_REF:-local}"

# If HEAD^ cannot be resolved (initial commit or shallow clone), build to be safe
if ! git rev-parse --verify HEAD^ >/dev/null 2>&1; then
  echo ":: [Vercel Ignore] Initial commit or shallow clone detected. Proceeding with build."
  exit 1
fi

# Compare current commit with previous commit
if git diff --quiet HEAD^ HEAD -- "$TARGET_DIR" package.json package-lock.json; then
  echo ":: [Vercel Ignore] No changes detected in $TARGET_DIR or root package files. Build cancelled."
  exit 0
else
  echo ":: [Vercel Ignore] Changes detected in $TARGET_DIR or root package files. Proceeding with build."
  exit 1
fi
