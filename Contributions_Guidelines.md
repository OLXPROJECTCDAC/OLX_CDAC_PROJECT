# 👥 Team Collaboration Guidelines (OLX Project)

Welcome, team! This document outlines how we’ll collaborate effectively on GitHub using branches, pull requests, and structured teamwork.

---

## 📌 Branching Strategy

| Branch                   | Purpose                                   |
| ------------------------ | ----------------------------------------- |
| `main`                   | Stable production-ready code only         |
| `dev`                    | Integration branch for all features       |
| `feature/your-name-task` | Individual features, components, or fixes |

---

## 🧱 Initial Setup (First Time Only)

## 1. **Clone the repo**:

```bash
git clone https://github.com/OLXPROJECTCDAC/OLX_CDAC_PROJECT.git
cd OLX_CDAC_PROJECT


##  2.  Switch to the integration branch:

git checkout dev
git pull origin dev



🔀 Workflow for All Tasks
⚠️ Always branch from dev, NOT from main.

 Create a feature branch:

git checkout dev
git pull origin dev
git checkout -b feature/your-name-task
 

🧠 Example:

feature/sanket-login-ui
feature/rahul-search-bar
[main] ───┬──> [dev] ───┬──> [feature/sanket-ui]
          │             └──> [feature/rahul-search]
          └──> [release]


Work only on your assigned component or task.

✅ Keep branches small and focused. Don’t mix unrelated changes.Means work on small components of project.


✅ Committing and Pushing
Stage & commit your changes:
git add .
git commit -m "Added login form UI"

Push your branch:
git push origin feature/your-name-task

🔄 Merging a Feature Branch Back to dev
Go to dev
Merge the feature
Push
git checkout dev
git pull origin dev
git merge feature/your-name-task
git push origin dev
This makes your work available for the team.





📤 Pull Requests (PRs)
After pushing your branch:

Go to GitHub → Pull Requests → "New Pull Request"
Set:
Base branch: dev
Compare branch: feature/your-name-task

Add:
PR title: Feature: Login UI by Sanket
Description of what you worked on
Submit and tag teammates for review


🔁 Daily Workflow (For All Team Members)
💡 Pro Tip for You and Your Team
📢 Add this rule to your team guidelines:
Before you start working each day or before pushing your feature branch, run:
git checkout dev
git pull origin dev
git checkout feature/your-name-task
git merge dev



✅ Git will never overwrite your committed code — it will ask you to resolve any conflicts manually.



🧼 Best Practices
One branch = one task (component or bugfix)
branch name will always going to be feature/Your-task-name
Meaningful commit messages
Do not push directly to main or dev
Test your code before making a PR
Coordinate on shared components to avoid conflicts




commands and what it does
| Command                  | Purpose                                                 |
| ------------------------ | ------------------------------------------------------- |
| `git checkout -b dev`    | Creates and switches to a new `dev` branch              |
| `git push -u origin dev` | Uploads the `dev` branch to GitHub                      |
| `git checkout dev`       | Switches your working folder to the `dev` branch        |
| `git pull origin dev`    | Updates your local `dev` with the latest remote changes |

| Command                      | Purpose                                               |
| ---------------------------- | ----------------------------------------------------- |
| `git checkout branch-name`   | Switch to an existing branch                          |
| `git checkout -b new-branch` | Create and switch to a new branch from current branch |
| `git branch`                 | List all local branches                               |
| `git branch -a`              | List all local + remote branches                      |
| `git branch -d branch-name`  | Delete a local branch                                 |
| `git branch -M main`         | Rename current branch to `main`                       |


git checkout feature/your-name-task
git merge dev
means:
You are telling Git to take the latest changes from the dev branch (which you just pulled from GitHub)
And combine (merge) them into your current feature/your-name-task branch
All of this happens locally on your machine