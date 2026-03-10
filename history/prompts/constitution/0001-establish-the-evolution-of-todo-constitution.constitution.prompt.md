---
id: 0001
title: Establish The Evolution of Todo Constitution
stage: constitution
date: 2026-03-11
surface: agent
model: Gemini 2.0 Flash
feature: none
branch: master
user: furqan
command: /sp.constitution
labels: [constitution, project-setup, principles]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

$ARGUMENTS

/sp.constitution # PROJECT CONSTITUTION
## The Evolution of Todo — Hackathon II

> **Purpose:** Define the governing principles for every AI agent and developer working on this project, ensuring all specifications, implementations, and deliverables stay consistent and professional.

---

## Rules

**Rule 1 — Spec First, Always**  
No implementation begins without an approved specification. If it is not in the spec, it does not get built.

**Rule 2 — No Unsolicited Additions**  
Do not add features, libraries, fields, or behaviors that are not explicitly requested. Good intentions do not override this rule.

**Rule 3 — AI Builds, Humans Architect**  
No manual boilerplate coding. Humans define what to build via specs. AI implements. Humans review and approve.

**Rule 4 — When in Doubt, Stop and Ask**  
If a requirement is unclear or ambiguous, stop immediately and request clarification. Never assume. Never guess.

**Rule 5 — Professional Grade Only**  
Every file, function, and artifact must meet the standard of work submitted to a senior engineering review. No shortcuts.

**Rule 6 — One Phase at a Time**  
Work only within the scope of the active phase. Do not implement future phase features early, even if they seem logical.

**Rule 7 — Clean Code is Non-Negotiable**  
Type hints, docstrings, meaningful naming, and proper project structure are required at all times — not optional.

**Rule 8 — Constitution Governs All**  
If any spec, instruction, or decision conflicts with this constitution, the constitution wins. Update the constitution first, then the specs.

---

*Any deviation from these rules is a violation of project standards.*

## Response snapshot

Updated the project constitution to v1.0.0 with 8 core principles for The Evolution of Todo — Hackathon II.

## Outcome

- ✅ Impact: High. Establishes the governing rules for the project.
- 🧪 Tests: No tests run for constitution update.
- 📁 Files: Updated .specify/memory/constitution.md
- 🔁 Next prompts: /sp.specify to start building the first feature.
- 🧠 Reflection: The user provided a clear set of 8 rules which were mapped directly to the constitution template.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
