# README

---

## Background

This application is a frontend for Frontier Blade Solutions to keep track of their employee TimeSheets.

**Admins** can manage Teams, view, filter, edit, and approve TimeSheets.

**Accountants** can view, filter, and export TimeSheets.

**Employees** can view, create, and submit their own TimeSheets for approval.

---

## Testing

### Vitest for Unit/Component Tests

- Use Vitest to test the logic inside individual components and Vuex modules.
- This includes testing individual Vue components, Vuex store mutations, actions, getters, and small interactions that don’t involve external systems like APIs or the router.
- Vitest works well with libraries like @testing-library/vue to test component rendering and interaction without needing a full browser environment.

### Cypress for E2E Tests

- Use Cypress for user interaction and integration testing.
- Cypress will simulate how users navigate this app, test form submissions, API interactions, authentication, and other critical flows.
- This helps ensure that the application behaves as expected from a user's perspective.

---
