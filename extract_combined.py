import re
import os

def clean_jsx(text):
    # Extract titles from props like title="..."
    titles = re.findall(r'title="([^"]+)"', text)
    
    # Remove all XML/HTML tags
    clean_text = re.sub(r'<[^>]+>', '\n', text)
    
    # Remove import statements and export const...
    clean_text = re.sub(r'import .*', '', clean_text)
    clean_text = re.sub(r'export const .*', '', clean_text)
    
    # Simple cleanup of multiple newlines
    clean_text = re.sub(r'\n\s*\n', '\n\n', clean_text)
    
    # Attempt to re-insert titles if they were lost (though they might be in the text already if rendered)
    # Actually, in the TSX structure: <SectionCard title="XYZ"> ... </SectionCard>
    # The regex <[^>]+> removes <SectionCard title="XYZ"> completely.
    # So we should preprocess to keep titles.
    
    # Replace <SectionCard title="XYZ" ...> with "\n### XYZ\n"
    text = re.sub(r'<SectionCard[^>]*title="([^"]+)"[^>]*>', r'\n### \1\n', text)
    text = re.sub(r'<ModernContent[^>]*title="([^"]+)"[^>]*>', r'\n# \1\n', text)
    # Also InfoBox doesn't always have a title prop, but icon.
    
    # Now remove other tags
    text = re.sub(r'<[^>]+>', '', text)
    
    # Decode some HTML entities if needed (basic ones)
    text = text.replace('&nbsp;', ' ').replace('&amp;', '&').replace('&quot;', '"')
    
    # Remove JS logic artifacts like {'\n'} or { } blocks if complex
    text = re.sub(r"\{'\\n'\}", "\n", text)
    text = re.sub(r"\{'\\n\\n'\}", "\n\n", text)
    
    # Remove remaining curly braces artifacts often found in JSX text: {" "}
    text = re.sub(r'\{"[^"]*"?\}', '', text)
    
    return text.strip()

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def main():
    base_path = '/Users/michalslawinski/.gemini/antigravity/scratch/mayiai'
    
    # Paths
    path_bezpieczenstwo = os.path.join(base_path, 'public/content/szkolenie_pelna_tresc.txt')
    path_nauczyciele = os.path.join(base_path, 'app/szkolenia/nauczyciele/training-modules-data.tsx')
    path_nauka = os.path.join(base_path, 'app/szkolenia/dzieci/training-modules-data-v2.tsx')
    
    output_path = '/Users/michalslawinski/Downloads/Wszystkie_Szkolenia_MayIAI.txt'
    
    full_content = []
    
    # 1. Bezpieczeństwo
    if os.path.exists(path_bezpieczenstwo):
        content = read_file(path_bezpieczenstwo)
        full_content.append("="*50)
        full_content.append("SZKOLENIE: BEZPIECZEŃSTWO W SIECI I W ŚWIECIE AI")
        full_content.append("="*50 + "\n")
        full_content.append(content)
        print("Processed Bezpieczeństwo")
    else:
        print(f"Warning: {path_bezpieczenstwo} not found")

    # 2. Dla Nauczycieli
    if os.path.exists(path_nauczyciele):
        raw_tsx = read_file(path_nauczyciele)
        # Extract content only from the array
        # This is rough, but effective enough for this purpose
        clean_text = clean_jsx(raw_tsx)
        
        full_content.append("\n" + "="*50)
        full_content.append("SZKOLENIE: DLA NAUCZYCIELI - AI W EDUKACJI")
        full_content.append("="*50 + "\n")
        full_content.append(clean_text)
        print("Processed Nauczyciele")
    else:
        print(f"Warning: {path_nauczyciele} not found")

    # 3. Nauka (Dzieci)
    if os.path.exists(path_nauka):
        raw_tsx = read_file(path_nauka)
        clean_text = clean_jsx(raw_tsx)
        
        full_content.append("\n" + "="*50)
        full_content.append("SZKOLENIE: NAUKA - AI DLA UCZNIÓW I RODZICÓW")
        full_content.append("="*50 + "\n")
        full_content.append(clean_text)
        print("Processed Nauka")
    else:
        print(f"Warning: {path_nauka} not found")
        
    # Write output
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(full_content))
    
    print(f"Combined content saved to: {output_path}")

if __name__ == "__main__":
    main()
