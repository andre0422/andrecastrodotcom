---
title: "Claude Code Setup for 2026"
subtitle: "Software Engineering"
image: "vbm_img_small.jpg"
alt: "Claude Code Setup"
date: 2026-01-03
draft: false
---

## Introduction

### Preface

Boris Cherny, the creator of claude code, released a series of tweets (X's?) describing his config for his creation. 
In response, I replicated sections of his config for my own work with claude code. Below is a guide to using this config for your own engineering work. 

This article demonstrates a production-ready Claude Code configuration featuring:
- **5 specialized agents** - Each an expert in a specific area (validation, architecture, review, refactoring, verification)
- **6 slash commands** - Quick workflows for common tasks (planning, testing, committing, PR creation)
- **Automated formatting** - Code gets formatted automatically as you edit
- **Project-aware intelligence** - Agents can be configured to understand any tech stack and follow your engineering principles

### Benefits

- **Faster onboarding** - Agents teach project patterns as developers work
- **Better code quality** - Automated validation and review before commits
- **Reduced context switching** - Planning, coding, testing, and committing from one interface
- **Consistent style** - Auto-formatting ensures code consistency
- **Knowledge sharing** - Agents enforce team conventions from your project guidelines

## Adapting This Setup for Your Project

### Tech Stack Agnostic

This guide uses **Django + Next.js** as the primary example throughout, but the configuration works with **any technology stack**. The agents, commands, and workflows are adaptable to your specific needs.

### Example Stack Adaptations

| Your Stack | Backend Tests | Frontend Build | Notes |
|------------|--------------|----------------|-------|
| **Django + Next.js** | `python manage.py test` | `npm run build` | Primary example used in this guide |
| **React + Express** | `npm test` (Jest) | `npm run build` (Webpack/Vite) | Replace Django commands with Jest |
| **Python FastAPI** | `pytest` | `npm run build` | Use pytest instead of Django test suite |
| **Ruby on Rails** | `rails test` | `rails assets:precompile` | Adapt for Bundler and RSpec |
| **Go + React** | `go test ./...` | `npm run build` | Update agents for Go testing patterns |

### Customization Quick Start

To adapt this setup for your project:

1. **Update Agent Prompts**: Modify agent `.md` files in `.claude/agents/` to reference your tech stack and patterns
2. **Adapt Commands**: Update command scripts in `.claude/commands/` to use your test runners and build tools
3. **Configure Hooks**: Modify `.claude/hooks/format-code.sh` to use your formatters (Prettier, ESLint, Black, etc.)
4. **Set Permissions**: Update `.claude/settings.json` to allow commands specific to your tools (e.g., `pytest`, `rails`, `go test`)

### Domain-Agnostic Examples

Throughout this guide, you'll see examples like "your-module", "api module", or "background jobs". These are placeholders - replace them with your actual module names, features, and domain concepts.


## Quick Start Guide

### Verify Installation

```bash
# Check if setup is working
claude

# List available agents
/agents

# Check configuration loaded
# You should see: build-validator, code-architect, 
# code-reviewer, code-simplifier, verify-app
```

### First Commands to Try

```bash
# Quick review of your recent changes
/project:quick-review

# Run tests intelligently
/project:run-tests

# See what commands are available
/help
```

### 5-Minute Tutorial

Let's make a small change and use the full workflow:

1. **Make a change** (e.g., fix a typo in README.md)

2. **Quick review**:
   ```
   /project:quick-review
   ```
   Claude will scan your changes for issues.

3. **Run tests** (if applicable):
   ```
   /project:run-tests your-module
   ```
   Replace `your-module` with your actual module/package name (e.g., `api`, `users`, `core`).

4. **Commit and push**:
   ```
   /project:commit-push-pr
   ```
   Claude will create a conventional commit, push it, and optionally create a PR.


### Where to Get Help

- This document (you're reading it)
- Your project guidelines file (e.g., `CLAUDE.md` or `CONTRIBUTING.md`)
- `/help` command in Claude Code
- Ask Claude directly: "How do I use the code-reviewer agent?"


## Directory Structure

```
/path/to/your-project/              # Your project root
├── .claude/
│   ├── agents/                    # 5 specialized AI agents
│   │   ├── build-validator.md     # Validates builds & tests
│   │   ├── code-architect.md      # Plans complex features
│   │   ├── code-reviewer.md       # Reviews code quality
│   │   ├── code-simplifier.md     # Refactors & simplifies
│   │   └── verify-app.md          # End-to-end verification
│   │
│   ├── commands/                  # 6 slash commands
│   │   ├── commit-push-pr.md      # Git workflow automation
│   │   ├── fix-ci.md              # CI troubleshooting
│   │   ├── plan-feature.md        # Feature planning
│   │   ├── quick-review.md        # Fast code review
│   │   └── run-tests.md           # Smart test runner
│   │
│   ├── hooks/                     # Automation scripts
│   │   └── format-code.sh         # Auto-formatting hook
│   │
│   ├── skills/                    # (Optional - for custom skills)
│   │
│   ├── settings.json              # Global configuration (committed)
│   └── settings.local.json        # Local overrides (gitignored)
│
├── CLAUDE.md                      # Optional: Project-specific guidelines
└── [your project files...]
```

### What Each Directory Does

| Directory | Purpose | Committed to Git? |
|-----------|---------|-------------------|
| `agents/` | Specialized AI agents for specific tasks | ✅ Yes (team-shared) |
| `commands/` | Slash commands for quick workflows | ✅ Yes (team-shared) |
| `hooks/` | Automation scripts (e.g., auto-formatting) | ✅ Yes (team-shared) |
| `skills/` | Custom project-specific skills | ✅ Yes (if created) |
| `settings.json` | Global permissions and config | ✅ Yes (team-shared) |
| `settings.local.json` | Your personal overrides | ❌ No (local only) |
| `.claude/plans/` | Generated feature plans | ❌ No (local only) |


## Agents Reference

### How to Invoke Agents

Agents are invoked using the Task tool in Claude Code. You can ask Claude directly:

```
"Please invoke the build-validator agent to check if everything passes"
"Use the code-architect agent to plan this feature"
"Run the code-reviewer agent on my recent changes"
```


### 1. build-validator

**Purpose**: Validates that the project builds successfully and all checks pass.

**Model**: Haiku (fast)

**When to Use**:
- After making significant code changes
- Before committing (if you want thorough validation)
- After merging main into your branch
- When you're unsure if something broke

**What It Does** (adapt commands for your stack):

**Example for Django + Next.js:**
1. Runs backend checks (`python manage.py check`)
2. Runs backend tests (`python manage.py test`)
3. Runs frontend build (`npm run build`)
4. Runs linter (`npm run lint`)

**Adapt for other stacks:**
- **FastAPI**: `pytest`, `mypy`, `npm run build`
- **Rails**: `rails test`, `rubocop`, `rails assets:precompile`
- **Express**: `npm test`, `npm run lint`, `npm run build`

Reports PASS/FAIL for each check with file:line references.

**Example Usage**:

```
You: "I just updated the Data model. Can you validate everything still builds?"

Claude: [Invokes build-validator agent]
```

**Output Example**:

```
## Build Validation Report

**Backend (Django)**
- System Check: PASS ✅
- Tests: 45/45 passing ✅

**Frontend (Next.js)**
- Build: PASS ✅
- Lint: PASS ✅

All checks passed! Ready to commit.
```

**Tip**: This agent is fast (uses Haiku model). Use it liberally.


### 2. code-architect

**Purpose**: Plans and architects complex features before implementation.

**Model**: Sonnet (high-intelligence)

**When to Use**:
- **Before** implementing features touching 3+ files
- When you're unsure how to approach a feature
- For architectural decisions
- When you need to understand existing patterns first

**What It Does**:
1. Analyzes feature requirements
2. Explores existing codebase patterns
3. Identifies all files that need creation/modification
4. Designs step-by-step implementation plan
5. Identifies risks, edge cases, testing strategy
6. **Does NOT write code** - only produces a plan

**Example Usage**:

```
You: "I need to add user authentication. Can you use the code-architect agent to plan this?"

Claude: [Invokes code-architect agent]

Agent output:
## Feature Analysis
- Problem: Need to authenticate users before accessing protected resources
- Acceptance criteria: Login, logout, session management
- Edge cases: Password reset, token expiration, concurrent sessions

## Implementation Plan
### Files to Create/Modify
- backend/users/model: User authentication model
- backend/auth/endpoints: Login/logout API endpoints
- frontend/login/component: Login UI component

### Implementation Steps
1. Create user authentication model (or extend framework's built-in)
2. Set up database migrations/schema updates
3. Create authentication API endpoints
4. Build frontend login interface
5. Add authentication middleware for protected routes

[... detailed plan continues ...]
```

**💡 Tip**: Always use this for features you've never implemented before. The 10 minutes planning saves hours of refactoring.

**⚠️ Warning**: This agent explores your codebase thoroughly. It may take 2-3 minutes for large features.


### 3. code-reviewer

**Purpose**: Reviews code for quality, security, and best practices before PRs.

**Model**: Sonnet

**When to Use**:
- Before creating pull requests
- After completing a feature
- When you want a second opinion
- To learn project patterns and best practices

**What It Does**:
1. Runs `git diff` to see your changes
2. Reads full context of modified files
3. Checks code correctness, security (XSS, SQL injection), performance
4. Validates against project-specific patterns from `CLAUDE.md`
5. Provides structured feedback:
   - 🔴 **Critical Issues** (must fix)
   - 🟡 **Warnings** (should fix)
   - 🟢 **Suggestions** (consider)
   - ✅ **Good Practices Observed**
6. Gives verdict: APPROVED / APPROVED WITH SUGGESTIONS / NEEDS REVISION

**Example Usage**:

```
You: "I finished the data processing feature. Can you review it?"

Claude: [Invokes code-reviewer agent]

Agent output:
## Code Review Report

### Summary
Added dual-calculation calculation results with frontend real-time updates and backend validation.

### 🔴 Critical Issues (Must Fix)
None found.

### 🟡 Warnings (Should Fix)
- frontend/components/DataForm.tsx:45 - Missing error handling for API call
- backend/your-module/views.py:120 - Consider adding rate limiting for resource creation

### 🟢 Suggestions (Consider)
- Could extract calculation logic into a utility function if used elsewhere

### ✅ Good Practices Observed
- Uses consistent API client for all calls (follows project patterns) ✅
- Uses Promise.allSettled for batch operations ✅
- Explicit navigation paths (not relying on browser history) ✅

### Verdict
✅ APPROVED WITH SUGGESTIONS
```

**Tip**: This agent knows all the patterns from `CLAUDE.md`. Use it to learn what "good code" looks like in your project.


### 4. code-simplifier

**Purpose**: Simplifies and refactors code after features are complete to reduce complexity.

**Model**: Sonnet

**When to Use**:
- **Proactively after completing any feature implementation**
- When code feels messy but works
- After several iterations on a feature
- When functions are getting too long (>50 lines)

**What It Does**:
1. Reads recently changed files
2. Identifies simplification opportunities:
   - Removes dead code and unused imports
   - Extracts repeated code (3+ occurrences)
   - Simplifies complex conditionals
   - Reduces nesting depth (max 3 levels)
   - Improves variable/function names
   - Splits large functions
3. Makes incremental changes
4. **Runs tests after each change** to verify no breakage
5. **Never changes external behavior** - only internal implementation

**Example Usage**:

```
You: "I finished the task queue feature but the code feels messy. Can you simplify it?"

Claude: [Invokes code-simplifier agent]

Agent output:
## Simplification Report

### Changes Made
- backend/your-module/views.py:150 - Extracted repeated validation logic into _validate_payment() helper
- backend/your-module/views.py:200 - Simplified nested if/else into early returns (reduced nesting from 4 to 2 levels)
- frontend/components/PaymentQueue.tsx:80 - Removed unused import 'useState'

### Metrics
- Lines removed: 15
- Functions extracted: 1
- Complexity reduction: Significant (nested conditionals simplified)

### Tests Status
- All tests passing: YES ✅
```

**Tip**: Use this agent **after** features work. Don't try to simplify while still implementing.

**⚠️ Warning**: This agent makes real edits. Make sure you've committed working code first!


### 5. verify-app

**Purpose**: Performs comprehensive end-to-end verification of the application.

**Model**: Sonnet

**When to Use**:
- **Before releases**
- After major changes (architecture, dependencies)
- Before merging large PRs
- When you want full confidence everything works

**What It Does**:
1. **Clean build**: Installs dependencies, runs migrations
2. **Automated tests**: Runs full test suite (backend + frontend lint)
3. **Manual verification**: Checks app starts, no console errors
4. **Critical paths**: Tests entity management, data submission, invoices, documents
5. **Regression check**: Verifies existing functionality unchanged
6. Generates comprehensive verification report

**Example Usage**:

```
You: "We're releasing v2.0 tomorrow. Can you verify everything works end-to-end?"

Claude: [Invokes verify-app agent]

Agent output:
## End-to-End Verification Report

### Build Status
**Backend**
- Clean build: PASS ✅
- Migrations: PASS ✅
- System check: PASS ✅

**Frontend**
- npm install: PASS ✅
- Build: PASS ✅
- Build warnings: 0

### Test Results
- Backend tests: 45/45 passing ✅
- Frontend lint: PASS ✅

### Manual Verification
- ✅ App starts successfully
- ✅ No console errors in logs
- ✅ Backend API responds (http://localhost:8000/api/)
- ✅ Frontend loads (http://localhost:3000)
- ✅ Database connection works

### Critical Paths Status
- ✅ Entity management: PASS
- ✅ Data submission: PASS
- ✅ Form entry: PASS
- ✅ Document viewer: PASS

### Overall Status
🟢 VERIFIED - All systems operational
```

**Tip**: This is thorough and slow. Only use before releases or major milestones.

**⚠️ Warning**: May take 5-10 minutes for full verification.


## Commands Reference

Commands are invoked with `/project:command-name` syntax.


### 1. /project:plan-feature

**Purpose**: Plan a new feature before implementation.

**Syntax**:
```
/project:plan-feature [feature description]
```

**What It Does**:
1. Switches to Plan Mode (if not already)
2. Invokes the **code-architect** agent automatically
3. Reviews plan with you and iterates based on feedback
4. Saves approved plan to `.claude/plans/<feature-name>.md`
5. **Does NOT implement** - planning only

**When to Use**:
- Before starting significant features
- When you need architectural guidance
- When you're unsure how to approach something

**Example**:

```
You: /project:plan-feature Add user authentication with JWT tokens

Claude: I'll plan this feature for you.
[Enters Plan Mode]
[Invokes code-architect agent]

The code-architect agent has created a detailed plan:
- Identifies 8 files to modify
- Proposes JWT-based authentication
- Includes migration strategy
- Provides testing checklist

Does this plan look good? Any changes needed?

You: Looks good, proceed.

Claude: Great! I've saved the plan to .claude/plans/add-user-authentication.md
You can reference it during implementation.
```

**💡 Tip**: The saved plan becomes your implementation checklist. Keep it open while coding.


### 2. /project:quick-review

**Purpose**: Quick code review of recent changes before committing.

**Syntax**:
```
/project:quick-review
```

**What It Does**:
1. Pre-computes `git diff` and `git diff --stat`
2. Scans for obvious issues:
   - Console.logs or debug code
   - Commented out code
   - TODO comments that should be addressed
   - Hardcoded values (URLs, credentials, magic numbers)
   - Missing error handling at system boundaries
3. Checks project-specific anti-patterns (from `CLAUDE.md`)
4. Quick quality check: naming, duplication, function length
5. Provides verdict: ✅ Ready / ⚠️ Minor issues / 🔴 Needs work

**When to Use**:
- Before every commit (make it a habit!)
- As a sanity check
- When you want fast feedback

**Example**:

```
You: /project:quick-review

Claude:
Changes: 3 files changed, 45 insertions(+), 12 deletions(-)

Quick Review Results:

✅ Ready to commit

No issues found. Changes are clean and focused:
- Added error handling for API calls
- Removed unused imports
- Follows project patterns (uses apiClient, Promise.allSettled)

All checklist items pass. Safe to commit!
```

**Alternative outcome**:

```
⚠️ Minor issues found:

1. frontend/components/Invoice.tsx:67 - console.log left in code
2. backend/your-module/views.py:120 - TODO comment: "Add rate limiting"

Fix these before committing, or commit with --no-verify if intentional.
```

**Tip**: This is FAST (pre-computes git info). Use it before every commit.


### 3. /project:run-tests

**Purpose**: Run tests intelligently - single app/file, changed files, or full suite.

**Syntax**:
```
/project:run-tests [app|file|all]
/project:run-tests              # Auto-detects changed files
/project:run-tests your-module     # Run specific app
/project:run-tests all          # Run full suite
```

**What It Does**:
1. **If argument provided**: Runs tests for that app/file
2. **If no argument**: Detects changed files with `git diff`, runs relevant tests
3. **If "all" or no changes**: Runs full test suite
4. Reports results: tests passed/failed, duration, coverage
5. Suggests fixes for failures

**When to Use**:
- After making changes (before committing)
- To verify specific functionality
- For TDD workflows (run single test repeatedly)

**Example 1 - Run specific app**:

```
You: /project:run-tests your-module

Claude: Running tests for your-module...

your-test-command your-module
# Example: pytest your-module/  (FastAPI)
# Example: python manage.py test your-module  (Django)
# Example: npm test your-module  (Node.js)

Results:
- Tests run: 15
- Tests passed: 15
- Tests failed: 0
- Time taken: 2.3s

All tests passed! ✅
```

**Example 2 - Auto-detect changed files**:

```
You: /project:run-tests

Claude: Detecting changed files...

Changed files:
- backend/your-module/models.py
- backend/your-module/views.py

Running tests for your-module...

Results:
- Tests run: 15
- Tests passed: 14
- Tests failed: 1

Failing test:
- test_invoice_creation (backend/your-module/tests/test_models.py:45)
  AssertionError: Expected status='pending', got status='draft'

Suggested fix: Check default value for Invoice.status field.
```

**💡 Tip**: Use without arguments for fast feedback loop while developing.


### 4. /project:commit-push-pr

**Purpose**: Commit changes, push to remote, and create a PR.

**Syntax**:
```
/project:commit-push-pr
```

**What It Does**:
1. Pre-computes git info (branch, status, diff, recent commits)
2. Reviews changes with you
3. Creates meaningful conventional commit message:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `chore:` for maintenance
   - `docs:` for documentation
   - `refactor:` for code restructuring
4. Commits with `git add -A && git commit -m "..."`
5. Pushes to remote with `-u` flag (sets upstream if needed)
6. Creates PR using GitHub CLI (`gh pr create --fill` or custom)

**When to Use**:
- After completing a feature or fix
- When you want full git workflow automation
- To ensure conventional commits

**Example**:

```
You: /project:commit-push-pr

Claude:
Current branch: feature/add-invoice-validation
Changed files:
  M backend/your-module/models.py
  M backend/your-module/serializers.py
  M backend/your-module/views.py

Recent commits:
  abc123 feat: add resource management feature
  def456 fix: resolve data processing calculation


I'll create a commit for these changes.

Commit message: "feat: add invoice validation with duplicate checking"

Running:
  git add -A && git commit -m "feat: add invoice validation with duplicate checking"

Pushing to remote:
  git push -u origin feature/add-invoice-validation

Creating PR:
  gh pr create --fill --web

PR created: https://github.com/youruser/yourproject/pull/42
```

**💡 Tip**: This enforces conventional commits, which makes the git history readable and enables automated changelogs.


### 5. /project:fix-ci

**Purpose**: Diagnose and fix CI failures.

**Syntax**:
```
/project:fix-ci
```

**What It Does**:
1. Gets CI status via `gh run list` and `gh run view --log-failed`
2. Analyzes failure categories:
   - Build failures (Django migrations, import errors, Next.js compilation)
   - Test failures
   - Lint failures (ESLint)
   - Type errors (TypeScript)
3. Reproduces failure locally
4. Fixes issues
5. Uses **build-validator** agent to verify all checks pass
6. Pushes fix and monitors new CI run

**When to Use**:
- When CI is red and you're not sure why
- To reproduce CI failures locally
- For systematic CI debugging

**Example**:

```
You: /project:fix-ci

Claude: Getting CI status...

gh run list --limit 5

Latest run: FAILED (3 minutes ago)
Workflow: CI

Fetching failed logs...

CI Failure Analysis:
- Build: PASS ✅
- Tests: FAILED ❌ (2 failing tests)
- Lint: PASS ✅

Failing tests:
1. test_invoice_total (backend/your-module/tests/test_models.py:78)
2. test_payment_queue (backend/your-module/tests/test_views.py:150)

Reproducing locally...

cd backend && poetry run python manage.py test

[Identifies issues and fixes them]

Running build-validator to verify...

All checks now pass! ✅

Pushing fix:
  git commit -am "fix: resolve CI test failures in data processings"
  git push

Monitoring new CI run...
  gh run watch

✅ CI is now green!
```

**⚠️ Note**: This command assumes GitHub Actions is configured. This example assumes GitHub Actions is configured, so this is ready for when you set it up.


## Hooks & Automation

### format-code.sh Hook

**Type**: PostToolUse hook (triggers after Edit tool)

**Purpose**: Automatically format code after Claude makes edits.

**What Gets Formatted**:

| File Type | Formatter | Command |
|-----------|-----------|---------|
| `.js`, `.jsx`, `.ts`, `.tsx` | Prettier | `npx prettier --write` |
| `.json`, `.md` | Prettier | `npx prettier --write` |
| `.py` | Black | `black` |
| `.go` | gofmt | `gofmt -w` |
| `.rs` | rustfmt | `rustfmt` |

**How It Works**:

1. You ask Claude to edit a file
2. Claude uses the Edit tool
3. Hook automatically runs after the edit
4. File gets formatted based on extension
5. Formatting happens silently (errors suppressed)

**Configuration** (in `.claude/settings.json`):

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "command": ".claude/hooks/format-code.sh"
      }
    ]
  }
}
```

### How to Temporarily Disable

If you need to disable auto-formatting for a session:

**Option 1 - Comment out in settings.json**:
```json
{
  "hooks": {
    "PostToolUse": [
      // {
      //   "matcher": "Edit",
      //   "command": ".claude/hooks/format-code.sh"
      // }
    ]
  }
}
```

**Option 2 - Use settings.local.json override**:
```json
{
  "hooks": {
    "PostToolUse": []
  }
}
```

### Customizing Formatters

**For Prettier** - Create `.prettierrc` in project root:
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2
}
```

**For Black** - Add to `backend/pyproject.toml`:
```toml
[tool.black]
line-length = 100
target-version = ['py311']
```

**💡 Tip**: The hook errors are silenced (2>/dev/null). If formatting fails, you won't see errors - check formatter installation manually.


## Common Workflows

### Workflow 1: Adding a New Feature

**Scenario**: You need to add a new feature touching multiple files.

**Steps**:

```
1. Plan the feature
   → /project:plan-feature Add task status tracking

2. Review plan and iterate
   → Claude shows plan from code-architect agent
   → You approve or request changes

3. Implement feature
   → Claude implements based on plan
   → Auto-formatting happens as code is edited

4. Run tests
   → /project:run-tests your-module

5. Quick review
   → /project:quick-review

6. Simplify if needed
   → "Please invoke the code-simplifier agent"

7. Commit and create PR
   → /project:commit-push-pr
```

**Time Saved**: ~30-45 minutes (planning prevents costly refactoring)


### Workflow 2: Fixing a Bug

**Scenario**: Bug reported, need quick fix.

**Steps**:

```
1. Fix the bug
   → "Fix the calculation rounding bug in your-module/models.py:120"
   → Claude makes the fix

2. Run related tests
   → /project:run-tests your-module

3. Quick review
   → /project:quick-review
   → Verify no debug code left, no regressions

4. Commit and push
   → /project:commit-push-pr
   → Commit message: "fix: correct calculation rounding issue"
```

**Time Saved**: ~10-15 minutes (automated review catches issues early)


### Workflow 3: Code Review Before PR

**Scenario**: You've been coding for a few hours, ready to create PR.

**Steps**:

```
1. Make all your changes
   → [multiple edits over several hours]

2. Run tests
   → /project:run-tests all

3. Comprehensive code review
   → "Please invoke the code-reviewer agent on all my changes"
   → Agent provides detailed feedback

4. Address critical issues and warnings
   → Fix security issues, missing error handling, etc.

5. Validate fixes
   → /project:run-tests all

6. Commit and create PR
   → /project:commit-push-pr
```

**Time Saved**: ~20-30 minutes (catches issues before PR review process)


### Workflow 4: Major Refactoring

**Scenario**: Need to refactor existing code to reduce complexity.

**Steps**:

```
1. Plan the refactoring
   → /project:plan-feature Refactor data processing logic

2. Implement changes
   → Claude refactors based on plan

3. Simplify the code
   → "Please invoke the code-simplifier agent"
   → Agent removes dead code, extracts functions, simplifies conditionals

4. Validate everything still works
   → "Please invoke the build-validator agent"

5. Commit changes
   → /project:commit-push-pr
   → Commit message: "refactor: simplify data processing logic"
```

**Time Saved**: ~45-60 minutes (systematic approach prevents breaking changes)


### Workflow 5: Pre-Release Verification

**Scenario**: Preparing for v2.0 release, need full confidence.

**Steps**:

```
1. Run comprehensive verification
   → "Please invoke the verify-app agent"
   → Agent performs clean build, runs all tests, checks critical paths

2. Address any issues found
   → Fix failing tests, resolve build warnings

3. Re-verify
   → "Please invoke the verify-app agent again"

4. Create release PR
   → /project:commit-push-pr
   → PR title: "Release v2.0"
```

**Time Saved**: ~60-90 minutes (automated verification catches regressions)


## Configuration Files

### settings.json (Global - Committed to Git)

**Location**: `.claude/settings.json`

**Purpose**: Team-wide configuration shared across all developers.

**Contents**:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "command": ".claude/hooks/format-code.sh"
      }
    ]
  },
  "permissions": {
    "allow": [
      "Read(**)",
      "Edit(**)",
      "Bash(npm:*)",
      "Bash(git:*)",
      "Bash(gh:*)",
      "Bash(npx prettier:*)"
    ]
  }
}
```

**What This Allows**:
- Reading any file in the project
- Editing any file in the project
- Running npm commands (build, test, install, etc.)
- Running git commands (add, commit, push, diff, etc.)
- Running GitHub CLI commands (gh pr create, gh run list, etc.)
- Running Prettier for code formatting

**⚠️ Warning**: Don't edit this file directly unless adding team-wide permissions. Use `settings.local.json` for personal overrides.


### settings.local.json (Local - Gitignored)

**Location**: `.claude/settings.local.json`

**Purpose**: Personal overrides and local-only permissions.

**Example** (your local config):

```json
{
  "permissions": {
    "allow": [
      "Bash(poetry run python:*)",
      "Bash(docker exec:*)",
      "Bash(curl:*)",
      "Bash(cat:*)",
      "Bash(rm:*)"
    ]
  }
}
```

**What This Adds**:
- Poetry commands (Python dependency management)
- Docker commands (for container management)
- curl (API testing)
- File operations (cat, rm)

**How to Add New Permissions**:

If Claude says "Permission denied" for a command:

1. Identify the command pattern (e.g., `poetry install`)
2. Add to `settings.local.json`:
   ```json
   {
     "permissions": {
       "allow": [
         "Bash(poetry install:*)"
       ]
     }
   }
   ```
3. Restart Claude Code session

**💡 Tip**: Local permissions merge with global permissions. You can't revoke global permissions, only add new ones.


## Best Practices

### When to Use Each Agent

```
┌─────────────────────────────────────────────────────────────┐
│ Decision Tree: Which Agent Should I Use?                  │
└─────────────────────────────────────────────────────────────┘

Start here:
  │
  ├─ Need to plan a feature? (3+ files, complex)
  │  └─→ Use code-architect
  │
  ├─ Just finished implementing a feature?
  │  └─→ Use code-simplifier (then build-validator)
  │
  ├─ Ready to create a PR?
  │  └─→ Use code-reviewer
  │
  ├─ Made significant changes?
  │  └─→ Use build-validator
  │
  └─ Preparing for release?
     └─→ Use verify-app
```

### How to Write Good Prompts for Agents

**❌ Bad**:
```
"Review my code"
```

**✅ Good**:
```
"Please invoke the code-reviewer agent on my recent changes.
I'm particularly concerned about security in the authentication logic."
```

**Why?** Specific prompts help agents focus on what matters.


### When to Plan vs. Just Code

**Plan first (use code-architect)** when:
- Feature touches 3+ files
- You've never implemented this before
- Multiple approaches are possible
- Architectural decisions needed

**Just code** when:
- Simple bug fix (1-2 files)
- Typo or obvious issue
- Adding a single function with clear requirements
- You've done this exact thing before

**Rule of thumb**: If you're uncertain, plan. 10 minutes planning saves hours of refactoring.


### Conventional Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear git history.

**Format**: `<type>: <description>`

**Types**:
- `feat:` - New feature
- `fix:` - Bug fix
- `chore:` - Maintenance (dependencies, config)
- `docs:` - Documentation only
- `refactor:` - Code restructuring (no behavior change)
- `test:` - Adding or updating tests
- `style:` - Formatting, whitespace (no code change)

**Example commit messages**:
```
feat: add view all pages for data submission display
feat: add resource management feature with componentized architecture
refactor: split location data into separate city and country fields
fix: resolve data processing calculation rounding issue
chore: update Django to 5.0.1
docs: update project guidelines with API patterns
```

**💡 Tip**: The `/project:commit-push-pr` command creates conventional commits automatically.


### Testing Before Commits

**Always run tests before committing**:

```bash
# Quick (changed files only)
/project:run-tests

# Thorough (full suite)
/project:run-tests all

# Specific app
/project:run-tests your-module
```

**Exception**: If you're committing work-in-progress (WIP) to save state, mark it clearly:

```
git commit -m "wip: partial implementation of task queue (tests failing)"
```

Then fix and amend before pushing:

```
[fix the issues]
git add .
git commit --amend -m "feat: add task queue with bulk processing"
```


### Using Agents Proactively (Not Just Reactively)

**Reactive** (waiting for problems):
```
[Code for 3 hours]
[Tests fail]
"Help, what's wrong?"
```

**Proactive** (preventing problems):
```
[Plan with code-architect]
[Implement]
[Run build-validator]
[Use code-simplifier]
[Review with code-reviewer]
[Commit]
```

**💡 Tip**: Proactive agent use catches issues early when they're cheap to fix.


## Troubleshooting

### "Agent not found"

**Symptoms**:
```
Error: Agent 'build-validator' not found
```

**Solution**:
```bash
# Check which agents are loaded
/agents

# Should show: build-validator, code-architect, code-reviewer,
#              code-simplifier, verify-app

# If missing, verify files exist
ls .claude/agents/

# If files exist but not loaded, restart Claude Code
```


### "Command not working"

**Symptoms**:
```
/project:quick-review
Unknown command
```

**Solution**:
```bash
# Verify settings.json is loaded
# Check that .claude/settings.json exists

ls .claude/settings.json

# Try:
/project:quick-review

# Alternative: Use slash completion
/project:[TAB]
```


### "Hook not running"

**Symptoms**:
```
Code is not auto-formatting after edits
```

**Solution**:
```bash
# Check hook has execute permissions
ls -lh .claude/hooks/format-code.sh
# Should show: -rwxr-xr-x (executable)

# If not executable:
chmod +x .claude/hooks/format-code.sh

# Verify hook is registered in settings.json
cat .claude/settings.json | grep -A5 hooks
```


### "Permission denied"

**Symptoms**:
```
Error: Permission denied for Bash(poetry:*)
```

**Solution**:

Add to `.claude/settings.local.json`:

```json
{
  "permissions": {
    "allow": [
      "Bash(poetry:*)"
    ]
  }
}
```

Then restart Claude Code session.


### "Formatter errors"

**Symptoms**:
```
Code formatting fails silently
```

**Solution**:

```bash
# Test formatters manually

# Prettier (JavaScript/TypeScript)
npx prettier --version
npx prettier --write test.ts

# Black (Python)
black --version
black test.py

# If not installed:
npm install -D prettier        # Frontend
pip install black              # Backend (or poetry add -D black)
```


## FAQ

### Q: Can I use Claude Code without these custom agents?

**A**: Yes! Claude Code works fine without agents. You lose:
- Specialized agents (validation, review, etc.)
- Slash commands
- Auto-formatting hook

But basic Claude Code features still work (chat, tool use, file editing).


### Q: How do I temporarily disable auto-formatting?

**A**: Comment out the hook in `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      // {
      //   "matcher": "Edit",
      //   "command": ".claude/hooks/format-code.sh"
      // }
    ]
  }
}
```

Or create `.claude/settings.local.json`:

```json
{
  "hooks": {
    "PostToolUse": []
  }
}
```


### Q: Can I create my own custom agents?

**A**: Yes! Create a new `.md` file in `.claude/agents/`:

```markdown
name: my-custom-agent
description: What this agent does
tools: Read, Grep, Glob
model: sonnet

You are a custom agent. Your job is...

[Instructions for the agent]
```

Restart Claude Code to load the new agent.


### Q: What if I want to use a different formatter?

**A**: Edit `.claude/hooks/format-code.sh`:

```bash
case "${FILE_PATH##*.}" in
  js|jsx|ts|tsx)
    # Change from Prettier to your formatter
    your-formatter "$FILE_PATH" 2>/dev/null
    ;;
esac
```


### Q: How do I update the setup if it changes?

**A**: Pull latest changes from git:

```bash
git pull origin main

# New agents/commands are in .claude/
# settings.json updates automatically
# Your settings.local.json is preserved (gitignored)
```


### Q: Can I run multiple Claude Code sessions?

**A**: Yes! The setup supports parallel sessions:

- Each terminal can have its own Claude Code session
- Settings are shared (`.claude/settings.json`)
- Local plans are separate (`.claude/plans/` is gitignored)

**Tip**: Useful for:
- Session 1: Long-running agent (verify-app)
- Session 2: Quick edits and commits


### Q: What's the difference between agents and commands?

**A**:

| Feature | Agents | Commands |
|---------|--------|----------|
| **Invocation** | "Invoke the X agent" | `/project:X` |
| **Purpose** | Specialized tasks (review, validate) | Quick workflows (test, commit) |
| **Speed** | Slower (explores codebase) | Faster (pre-computed) |
| **Customization** | Full AI agent with instructions | Scripted workflow |

**Example**:
- **Agent**: "Invoke code-reviewer" → AI analyzes code, provides detailed feedback
- **Command**: `/project:quick-review` → Pre-computes git diff, runs checklist


## Advanced Usage

### Chaining Multiple Agents

You can invoke agents sequentially for comprehensive workflows:

```
You: "I finished the payment feature. Let's validate it thoroughly."

Claude: I'll run a comprehensive validation:

1. First, invoke code-simplifier to clean up the code
   [Simplifier runs: removes dead code, extracts functions]

2. Then, invoke build-validator to verify builds pass
   [Validator runs: all tests pass ✅]

3. Finally, invoke code-reviewer for quality check
   [Reviewer runs: APPROVED WITH SUGGESTIONS]

Summary:
- Code simplified: 15 lines removed, 1 function extracted
- All builds pass: ✅
- Code review: APPROVED (with 2 minor suggestions)

Ready to commit!
```


### Creating Custom Skills

Skills are project-specific reusable commands. Create in `.claude/skills/`:

**Example**: `.claude/skills/seed-data.md`

```markdown
name: seed-data
description: Seed the database with test data

# Database Seeding Workflow

Run these commands to seed the database:

1. Clear existing data:
   ```bash
   cd backend
   poetry run python manage.py flush --no-input
   ```

2. Run seed script:
   ```bash
   poetry run python manage.py seed_data
   ```

3. Verify:
   ```bash
   # Django example:
   python manage.py shell
   >>> from your_module.models import YourModel
   >>> YourModel.objects.count()
   50
   ```
```

Invoke with: `/project:seed-data`


### Modifying Existing Agents

Want to customize an agent? Edit the `.md` file:

**Example**: Make build-validator skip frontend build (to save time)

Edit `.claude/agents/build-validator.md`:

```markdown
## When invoked:

1. **Run Backend Checks** (Django):
   - System check: `cd backend && poetry run python manage.py check`
   - Run tests: `cd backend && poetry run python manage.py test`

2. **Run Frontend Checks** (Next.js):
   - ~~Build: `cd frontend && npm run build`~~ (SKIPPED for speed)
   - Lint: `cd frontend && npm run lint`
```

**💡 Tip**: Document changes in comments so team knows the behavior.


### Performance Tips

**Model Selection**:
- **Haiku** (fast, lower cost): build-validator, quick tasks
- **Sonnet** (slower, higher intelligence): code-architect, code-reviewer
- **Opus** (slowest, highest intelligence): Complex architectural decisions

**Use haiku for**:
- Validation and testing
- Quick reviews
- Repeated tasks

**Use sonnet for**:
- Planning and architecture
- Code review with security analysis
- Refactoring with context understanding

**Example**: Change build-validator to Opus if you need deeper analysis:

```markdown
name: build-validator
model: opus
```


### Parallel Claude Sessions

**Use case**: Run long agent while continuing to code

**Terminal 1**:
```
You: "Invoke verify-app agent for full verification"
Claude: [Running comprehensive checks... this will take 5-10 minutes]
```

**Terminal 2** (new session):
```
You: "While that runs, let me fix this typo in README"
Claude: [Quick edit, auto-formatted, committed]
```

**💡 Tip**: Use separate terminals for:
- Long-running agents (verify-app)
- Quick edits and reviews
- Different features (context isolation)


## Project-Specific Context

### How Agents Use CLAUDE.md

Every agent automatically reads `CLAUDE.md` on invocation. This means they:

- Know project structure (Django + Next.js monorepo)
- Follow engineering principles (avoid over-engineering, no premature abstractions)
- Enforce patterns (use `apiClient`, explicit `router.push`, `Promise.allSettled`)
- Avoid anti-patterns (no `router.back()`, no helpers for one-time ops)
- Understand tech stack (Poetry, npm, Docker Compose)

**Example**: code-reviewer checks for project-specific patterns:

```
### Good Practices Observed
- Uses apiClient for API calls (follows CLAUDE.md pattern) 
- Uses Promise.allSettled for batch operations 
- Explicit router.push with paths (not router.back()) 
```

**💡 Tip**: Keep `CLAUDE.md` updated as patterns evolve. Agents will automatically enforce new patterns.


### Example Project Patterns

You can configure agents to enforce project-specific patterns by creating a project guidelines file (e.g., `CLAUDE.md`). Here are example patterns:

**Frontend Best Practices** (adapt for your stack):
- Use consistent API client (not raw fetch/axios calls everywhere)
- Dual-validation: Frontend real-time validation + backend validation
- Explicit navigation paths (not relying on browser history)
- Consistent component patterns (e.g., layout wrappers that handle data fetching)

**Backend Best Practices** (adapt for your framework):
- Follow framework conventions (e.g., serializers before views in Django)
- Organize code by domain/module (not by file type)
- Use appropriate dependency management tool
- Handle nullable fields explicitly (set defaults or allow null)

**Universal Engineering Principles**:
- Avoid over-engineering
- No premature abstractions
- Delete unused code completely
- Error handling only at system boundaries


### Example Tech Stack Configuration

**Example: Django + Next.js Monorepo**

Configure agents to understand your stack structure:

**Backend** (`backend/`):
- Django 5.0 + PostgreSQL 15
- REST API with Django REST Framework
- Poetry for dependency management
- Organized by domain modules (users, api, core)

**Frontend** (`frontend/`):
- Next.js 16 (App Router)
- React 19 + TypeScript 5
- Tailwind CSS 4

**Infrastructure**:
- Docker Compose for local development
- Services: database, backend API, frontend

**Customize agent commands for your stack**:
```bash
# Django example:
cd backend && python manage.py test

# FastAPI alternative:
pytest backend/

# Express alternative:
npm test
```


## Quick Reference Card

### Commands Cheat Sheet

| Command | What It Does |
|---------|-------------|
| `/project:plan-feature [desc]` | Plan a feature before coding (invokes code-architect) |
| `/project:quick-review` | Fast code review before commit |
| `/project:run-tests [app\|all]` | Smart test runner (auto-detects changed files) |
| `/project:commit-push-pr` | Commit + push + create PR with conventional commits |
| `/project:fix-ci` | Diagnose and fix CI failures |


### Agents Cheat Sheet

| Agent | When to Use | Speed |
|-------|-------------|-------|
| **build-validator** | After significant changes | Fast ⚡ |
| **code-architect** | Before complex features (3+ files) | Slow 🐌 |
| **code-reviewer** | Before creating PRs | Medium ⏱️ |
| **code-simplifier** | After completing features | Medium ⏱️ |
| **verify-app** | Before releases | Very Slow 🐌🐌 |


### Common Workflows (Condensed)

**New Feature**:
```
plan-feature → implement → run-tests → quick-review → commit-push-pr
```

**Bug Fix**:
```
fix → run-tests → quick-review → commit-push-pr
```

**Before PR**:
```
run-tests all → code-reviewer → fix issues → commit-push-pr
```

**Refactoring**:
```
plan-feature → implement → code-simplifier → build-validator → commit-push-pr
```

**Release**:
```
verify-app → fix issues → commit-push-pr
```


### Keyboard Shortcuts

*Note: These are standard Claude Code shortcuts, not specific to our setup*

| Shortcut | Action |
|----------|--------|
| `Shift+Tab` (2x) | Enter Plan Mode |
| `Ctrl+C` | Cancel current operation |
| `/agents` | List all agents |
| `/help` | Show help |


## Conclusion

You now have a comprehensive understanding of how to build and customize a production-ready Claude Code setup for your projects.

**Key Takeaways**:
1. **Use agents proactively** - they prevent problems before they happen
2. **Commands automate workflows** - customize them for your tech stack
3. **Auto-formatting is your friend** - configure for your formatters
4. **Plan before coding** - for features touching 3+ files
5. **Test before committing** - always
6. **Adapt to your stack** - this guide is framework-agnostic

**Next Steps**:
1. Try the [5-minute tutorial](#5-minute-tutorial) in Quick Start
2. Adapt agent prompts for your tech stack (see [Adapting This Setup](#adapting-this-setup-for-your-project))
3. Create your project guidelines file (e.g., `CLAUDE.md`) with your patterns
4. Customize commands and hooks for your tools
5. Share this setup with your team


