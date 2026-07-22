from pathlib import Path
import re
root = Path(__file__).resolve().parent.parent
regex = re.compile(r"\b(agent|Agent)\b")

def matches(path):
    try:
        text = path.read_text(encoding='utf-8')
    except Exception:
        return []
    result = []
    for i, line in enumerate(text.splitlines(), 1):
        if regex.search(line):
            result.append((i, line))
    return result

for p in root.rglob('*'):
    if p.is_file() and p.suffix in {'.ts', '.tsx', '.js', '.jsx', '.mjs'} and 'node_modules' not in p.parts and '.next' not in p.parts:
        hits = matches(p)
        if hits:
            for line_no, line in hits:
                print(f"{p.relative_to(root)}:{line_no}:{line.strip()}")
print('DONE')
