# How to Revert to a Previous Commit and Push Changes

This guide explains how to go back to a specific commit and discard all subsequent changes, then push these changes to your remote repository.

## Prerequisites
- Git installed on your system
- Access to the command line/terminal
- Existing Git repository with the commit you want to return to

## Steps to Revert to a Specific Commit

1. **Save your current work**
   If you have any uncommitted changes you want to keep, commit or stash them first:
   ```bash
   git add .
   git commit -m "Save current work before reverting"
   ```
   Or to stash your changes:
   ```bash
   git stash save "Work before reverting"
   ```

2. **Check the commit history**
   Verify the commit hash you want to return to:
   ```bash
   git log --oneline
   ```
   Look for the commit with hash `b13c78ee3babc2554b3f077bc0cfd61c4df9afc4`

3. **Hard reset to the specific commit**
   This will discard all changes after the specified commit:
   ```bash
   git reset --hard b13c78ee3babc2554b3f077bc0cfd61c4df9afc4
   ```

4. **Force push to remote repository**
   ⚠️ **Warning**: This will overwrite the remote repository history. Only do this if you're sure you want to discard all commits after the specified one.

   ```bash
   git push --force origin HEAD
   ```

   If you're working on a specific branch (e.g., `main` or `master`):
   ```bash
   git push --force origin <branch-name>
   ```

## Alternative: Create a New Branch

If you want to keep the current state but also have access to the previous state:

1. Create a new branch from the current state:
   ```bash
   git branch backup-before-revert
   ```

2. Then reset your current branch to the old commit:
   ```bash
   git reset --hard b13c78ee3babc2554b3f077bc0cfd61c4df9afc4
   ```

## Important Notes

- The `--hard` flag will permanently delete all changes after the specified commit
- Force pushing (`--force`) rewrites history and can cause issues for other collaborators
- Always communicate with your team before force pushing to shared branches
- Consider using `git revert` instead if you want to keep a record of the changes being undone

## Verifying the Changes

After the reset:

```bash
git log --oneline
# Should show the commit at the top
git status
# Should show "Your branch is behind 'origin/<branch>' by X commits"
```

## Recovering from Mistakes

If you accidentally reset to the wrong commit, you can recover using:

```bash
git reflog
# Find the commit you want to return to
git reset --hard <commit-hash>
```

## Best Practices

1. Always create a backup branch before performing destructive operations
2. Only force push to feature branches, not to main/master
3. Inform your team before rewriting shared history
4. Consider using `git revert` for public repositories to maintain history
