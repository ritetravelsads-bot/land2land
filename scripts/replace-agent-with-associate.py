from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
include_ext = {'.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.mjs', '.html', '.php'}
exclude_dirs = {'node_modules', '.git'}
exclude_files = {'package-lock.json'}

patterns = [
    (re.compile(r'\bFind Agents\b'), 'Find Associates'),
    (re.compile(r'\bFind Agent\b'), 'Find Associate'),
    (re.compile(r'\bfind-agents\b'), 'find-associates'),
    (re.compile(r'\bfind-agent\b'), 'find-associate'),
    (re.compile(r'\bAgents\b'), 'Associates'),
    (re.compile(r'\bagents\b'), 'associates'),
    (re.compile(r'\bAgent\b'), 'Associate'),
    (re.compile(r'\bagent\b'), 'associate'),
]

changed_files = []
for path in root.rglob('*'):
    if path.is_file() and path.suffix in include_ext:
        if path.name in exclude_files:
            continue
        if any(part in exclude_dirs for part in path.parts):
            continue
        text = path.read_text(encoding='utf-8')
        new_text = text
        for pat, repl in patterns:
            new_text = pat.sub(repl, new_text)
        if new_text != text:
            path.write_text(new_text, encoding='utf-8')
            changed_files.append(path.relative_to(root))

print('changed', len(changed_files))
for f in changed_files:
    print(f)
