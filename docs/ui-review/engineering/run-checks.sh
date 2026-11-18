#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../../.."
export PLAYWRIGHT_MODULE="${PLAYWRIGHT_MODULE:-$PWD/../urban-groove-melbourne/node_modules/playwright}"
export AXE_MODULE="${AXE_MODULE:-$PWD/../urban-groove-melbourne/node_modules/@axe-core/playwright}"
export LD_LIBRARY_PATH="$HOME/.local/lib/bazfit-browser/usr/lib/x86_64-linux-gnu${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
node docs/ui-review/engineering/check.cjs "$@"
