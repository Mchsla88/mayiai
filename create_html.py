import sys

input_path = '/Users/michalslawinski/.gemini/antigravity/scratch/mayiai/public/content/szkolenie_pelna_tresc.txt'
output_path = '/Users/michalslawinski/.gemini/antigravity/scratch/mayiai/szkolenie_temp.html'

with open(input_path, 'r', encoding='utf-8') as f:
    text = f.read()

html_content = f"""
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
body {{ font-family: sans-serif; font-size: 12pt; line-height: 1.5; padding: 2em; }}
pre {{ white-space: pre-wrap; font-family: monospace; }}
</style>
</head>
<body>
<pre>
{text}
</pre>
</body>
</html>
"""

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html_content)
