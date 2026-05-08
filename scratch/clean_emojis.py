import json
import re

def remove_emojis(text):
    if not isinstance(text, str):
        return text
    # Remove emoji characters
    return re.sub(r'[^\x00-\x7F]+', '', text).strip()

def clean_obj(obj):
    if isinstance(obj, dict):
        return {k: clean_obj(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [clean_obj(v) for v in obj]
    else:
        return remove_emojis(obj)

with open('/home/nidhi/AEON/src/data/roadmap.json', 'r') as f:
    data = json.load(f)

cleaned_data = clean_obj(data)

with open('/home/nidhi/AEON/src/data/roadmap.json', 'w') as f:
    json.dump(cleaned_data, f, indent=2)
