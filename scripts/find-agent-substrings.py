from pathlib import Path
import re
root = Path(__file__).resolve().parent.parent
regex = re.compile(r"agent", re.IGNORECASE)
for p in root.rglob('*'):
    if p.is_file() and p.suffix in {'.ts', '.tsx', '.js', '.jsx', '.mjs'} and 'node_modules' not in p.parts and '.next' not in p.parts:
        try:
            text = p.read_text(encoding='utf-8')
        except Exception:
            continue
        if regex.search(text):
            print(p.relative_to(root))
print('SCAN COMPLETE')
