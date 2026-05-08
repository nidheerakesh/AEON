import re
import os

def remove_emojis(text):
    # Remove emoji characters and non-ASCII characters
    return re.sub(r'[^\x00-\x7F]+', '', text)

files_to_clean = [
    '/home/nidhi/AEON/src/data/boss-fights.ts',
    '/home/nidhi/AEON/src/app/page.tsx',
    '/home/nidhi/AEON/src/app/boss-fight/page.tsx',
    '/home/nidhi/AEON/src/app/planner/page.tsx',
    '/home/nidhi/AEON/src/app/roadmap/page.tsx',
    '/home/nidhi/AEON/src/app/analytics/page.tsx',
    '/home/nidhi/AEON/src/components/layout/Sidebar.tsx',
    '/home/nidhi/AEON/src/lib/achievements.ts',
    '/home/nidhi/AEON/src/lib/xp-engine.ts',
    '/home/nidhi/AEON/src/types/index.ts',
    '/home/nidhi/AEON/src/lib/bossfight.ts'
]

for file_path in files_to_clean:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        cleaned_content = remove_emojis(content)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(cleaned_content)
        print(f"Cleaned {file_path}")
    else:
        print(f"File not found: {file_path}")
