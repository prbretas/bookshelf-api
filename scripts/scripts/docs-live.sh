#!/usr/bin/env bash
set -e

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

PROMPT_TEMPLATE="docs/prompts/docs-live-update.md"
OUTPUT_DIR=".tmp/docs-live"
OUTPUT_PROMPT="$OUTPUT_DIR/docs-live.generated.md"

mkdir -p "$OUTPUT_DIR"

if [ ! -f "$PROMPT_TEMPLATE" ]; then
  echo "Erro: template não encontrado em $PROMPT_TEMPLATE"
  exit 1
fi

python3 <<'PY'
from pathlib import Path
import subprocess
import sys

repo_root = Path.cwd()
template_path = repo_root / "docs/prompts/docs-live-update.md"
output_path = repo_root / ".tmp/docs-live/docs-live.generated.md"


def run_git_command(args):
    result = subprocess.run(
        ["git"] + args,
        cwd=repo_root,
        text=True,
        capture_output=True
    )
    if result.returncode != 0:
        print(result.stderr)
        sys.exit(result.returncode)
    return result.stdout.strip()


working_diff = run_git_command(["diff"])
staged_diff = run_git_command(["diff", "--cached"])
working_files = run_git_command(["diff", "--name-only"])
staged_files = run_git_command(["diff", "--cached", "--name-only"])

all_files = []
for item in (working_files + "\n" + staged_files).splitlines():
    item = item.strip()
    if item and item not in all_files:
        all_files.append(item)

git_diff = "\n\n".join(part for part in [working_diff, staged_diff] if part.strip())
changed_files = "\n".join(all_files)

if not git_diff.strip():
    print("Nenhuma mudança detectada pelo Git.")
    print("Altere algum arquivo antes de gerar a documentação viva.")
    sys.exit(0)

content = template_path.read_text(encoding="utf-8")
content = content.replace("{{CHANGED_FILES}}", changed_files)
content = content.replace("{{GIT_DIFF}}", git_diff)

output_path.parent.mkdir(parents=True, exist_ok=True)
output_path.write_text(content, encoding="utf-8")

print()
print("Prompt gerado com sucesso:")
print(output_path)
print()
print("Use este arquivo no Kiro para atualizar a documentação viva.")
PY
