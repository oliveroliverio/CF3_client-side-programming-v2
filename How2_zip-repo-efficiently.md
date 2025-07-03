# 250701: Creating a Clean Zip Archive of Your Repository

When submitting your repository to your instructor, it's important to exclude large directories like `.parcel-cache` and `node_modules` to keep the zip file size manageable. This document outlines the best approaches for creating a clean zip archive.

## Option 1: Using the `zip` Command with Exclusions

```bash
# Navigate to your repository root
cd /Users/mbp16-oo/Downloads/z-dev/___DVW-CareerFoundry/CF3_client-side-programming-v2

# Create a zip file excluding unnecessary directories
zip -r myflix-client-api-integration.zip . -x "node_modules/*" ".parcel-cache/*" "dist/*" ".git/*" ".DS_Store" "*.log" "images-md/*"
```

This command creates a zip file that includes all files and directories except those specified after the `-x` flag.

## Option 2: Create a Clean Directory and Zip That

```bash
# Create a temporary directory
mkdir -p /tmp/myflix-clean

# Copy only necessary files (adjust patterns as needed)
rsync -av --exclude="node_modules" --exclude=".parcel-cache" --exclude="dist" --exclude=".git" --exclude=".DS_Store" --exclude="*.log" /Users/mbp16-oo/Downloads/z-dev/___DVW-CareerFoundry/CF3_client-side-programming-v2/ /tmp/myflix-clean/

# Create zip from the clean directory
cd /tmp/myflix-clean
zip -r myflix-client-api-integration.zip .

# Move zip back to your project directory
mv myflix-client-api-integration.zip /Users/mbp16-oo/Downloads/z-dev/___DVW-CareerFoundry/CF3_client-side-programming-v2/
```

This approach creates a clean copy of your repository before zipping, which can be helpful if you want to verify what's being included.

## Recommended Files to Include/Exclude

### Include:
- `src/` directory (your source code)
- `package.json` and `package-lock.json` (dependency information)
- `.gitignore` (shows what files are typically excluded)
- `README.md` and other documentation
- Any custom configuration files

### Exclude:
- `node_modules/` (can be recreated with `npm install`)
- `.parcel-cache/` (build cache)
- `dist/` (compiled output)
- `.git/` (version control data)
- `.DS_Store` (Mac system files)
- Log files and temporary files

## Verifying Zip Contents

You can verify the contents of your zip file before sending it:

```bash
# List all files in the zip archive
unzip -l myflix-client-api-integration.zip
```

## Note for Instructor

Consider adding a note in your submission explaining that you've excluded `node_modules` and other build artifacts to reduce file size. Mention that the instructor can run `npm install` to restore these dependencies if they want to run the code locally.

## Size Check

Check the size of your zip file to ensure it's reasonable for email or upload:

```bash
du -h myflix-client-api-integration.zip
```

A reasonable size for a React project without node_modules should be under 10MB.
