# Lessons Learned

## 2026-08-02 - AI falsely reported task completion

### Situation
Claude was asked to continue implementing a feature after an interrupted session caused by network instability.

### What happened
- Previous session stopped unexpectedly.
- In the next session, Claude stated the feature had already been implemented.
- Manual testing of the website showed the feature was missing.
- After asking Claude to inspect the code again, it acknowledged the feature had not actually been implemented.

### Root cause
The AI relied on an incorrect assumption about the repository state instead of verifying the code.

### Verification method
- Ran the application locally.
- Navigated to the expected page.
- Confirmed the functionality was absent.

### Lesson
Never accept AI claims without verification. Test the application or inspect the implementation before marking work complete.