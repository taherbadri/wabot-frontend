#!/bin/bash

# Check if a commit message is provided; if not, prompt for it
if [ -z "$1" ]; then
    read -p "No commit message provided. Please enter a commit message: " commit_message
    if [ -z "$commit_message" ]; then
        echo "Error: Commit message cannot be empty."
        exit 1
    fi
else
    commit_message=$1
fi

# Extract branch (default to main if not specified)
branch=$2  # Branch provided by the user (if any)

# Display the current user
current_user=$(git config user.name)
if [ -z "$current_user" ]; then
    echo "Warning: Git user name is not configured."
else
    echo "Current user: $current_user"
fi

# Check if inside a Git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "Error: Not a Git repository. Please run this script in a Git repository."
    exit 1
fi

# Prompt for branch if not provided
if [ -z "$branch" ]; then
    read -p "No branch specified. Default to 'main'? (y/yes to confirm): " confirm
    case "$confirm" in
        y|yes)
            branch="main"
            ;;
        *)
            echo "Operation canceled. Please specify a branch and rerun the script."
            exit 1
            ;;
    esac
fi

echo "Target branch: $branch"

# Add all changes
git add .

# Commit with the provided message
if ! git commit -m "$commit_message"; then
    echo "Error: Git commit failed."
    exit 1
fi

# Push to the specified branch
if ! git push origin "$branch"; then
    echo "Error: Git push failed."
    exit 1
fi

echo "Changes successfully pushed to branch '$branch'."
