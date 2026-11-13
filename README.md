<div align="center">

# 🅰️ Angular, Learning Notes & Playgrounds

**Hands-on notes, written in plain language, with a runnable sample project for almost every topic.**

![Angular](https://img.shields.io/badge/Angular-22-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vitest](https://img.shields.io/badge/Tests-Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Sections](https://img.shields.io/badge/Sections-22-8A2BE2?style=for-the-badge)
![Status](https://img.shields.io/badge/Notes-Verified%20against%20angular.dev-success?style=for-the-badge)

[Learning path](#-learning-path) · [Sections](#-sections) · [Status labels](#-status-labels) · [Running a project](#-running-a-sample-project) · [Repository layout](#-repository-layout)

</div>

---

## ✨ What is this?

A personal, structured walk through Angular, from components and data binding all the way to signals, SSR, change detection and deferrable views.

- 📝 **Notes:** every section has a `NOTES` folder with short, numbered markdown files you can read in order.
- 🧪 **Sample projects:** nearly every section ships the final code of a small Angular project that matches the notes.
- 🔄 **Kept current:** the projects run on **Angular 22**, and the notes are checked against the official [angular.dev](https://angular.dev) docs. Anything old, legacy or deprecated is **called out right at the top of the note**.

> [!NOTE]
> Angular moves fast. When a note teaches something the Angular team no longer recommends, it carries a status banner (see [Status labels](#-status-labels)) and points to the modern alternative instead of silently teaching the old way.

---

## 🧭 Learning path

```mermaid
flowchart LR
    A[000 Recipe Project] --> B[001 Components]
    B --> C[002 Directives]
    C --> D[003 Services & DI]
    D --> E[004 Routing]
    E --> F[005 Observables]
    F --> G[006 Forms]
    G --> H[007 Pipes]
    H --> I[008 HTTP]
    I --> J[009 Auth]
    J --> K[010 Dynamic Components]
    K --> L[012 Standalone]
    L --> M[013 Signals]
    M --> N[018 Control Flow]
    N --> O[020 Change Detection]
    O --> P[019 SSR]
    P --> Q[021 Deferrable Views]
    style A fill:#DD0031,color:#fff
    style M fill:#8A2BE2,color:#fff
    style Q fill:#2e8b57,color:#fff
```

Sections `011`, `014`, `015`, `016` and `017` are standalone topics you can read whenever you need them.

---

## 📚 Sections

| # | Section | What you'll learn | Status |
|---|---------|-------------------|:------:|
| 000 | [Recipe Project](./000.%20Recipe%20Project) | The end-to-end sample app that later sections (authentication, dynamic components, modules) refer back to | 🟢 |
| 001 | [Components & Data Binding Deep Dive](./001.%20Components%20%26%20Data%20Binding%20Deep%20Dive) | Inputs/outputs, view encapsulation, template variables, `ViewChild`/`ContentChild`, content projection, lifecycle hooks, `DestroyRef`, render hooks | 🟡 |
| 002 | [Directives Deep Dive](./002.%20Directives%20Deep%20Dive) | Attribute and structural directives, host events and bindings, the `host` property, host directives | 🟡 |
| 003 | [Services & Dependency Injection](./003.%20Services%20%26%20Dependency%20Injection) | Services, providers, injectors, injection tokens, the `@Service` decorator, `inject()` | 🟡 |
| 004 | [Routing](./004.%20Routing) | Routes, links and navigation, route and query parameters, input bindings for route data, nested routes, redirects, guards (`CanActivate`, `CanActivateChild`, `CanDeactivate`, `CanMatch`), resolvers, location strategies | 🟢 |
| 005 | [Understanding Observables](./005.%20Understanding%20Observables) | What observables are, building a custom observable, RxJS operators, subjects, signals vs observables | 🟢 |
| 006 | [Handling Forms in Angular](./006.%20Handling%20Forms%20in%20Angular) | Template-driven, Reactive and Signal Forms, validation, custom and async validators | 🟢 |
| 007 | [Using Pipes to Transform Output](./007.%20Using%20Pipes%20to%20Transform%20Output) | Built-in pipes, custom pipes, filter and sort pipes, pure vs impure | 🟢 |
| 008 | [Making HTTP Requests](./008.%20Making%20HTTP%20Requests) | `HttpClient`, GET/POST, error handling, interceptors | 🟡 |
| 009 | [Authentication & Route Protection](./009.%20Authentication%20%26%20Route%20Protection) | Sign-up and sign-in requests, storing the user, adding the token with an interceptor, logout, auto-login and auto-logout, an auth guard | 🟢 |
| 010 | [Dynamic Components](./010.%20Dynamic%20Components) | Creating components programmatically, `ViewContainerRef` | 🟡 |
| 011 | [Angular Modules](./011.%20Angular%20Modules%20%28Legacy%29) | `NgModule`s, feature modules, lazy loading; kept for reading older codebases | 🔴 |
| 012 | [Standalone Components](./012.%20Standalone%20Components) | Standalone components, directives, services and routing | 🟢 |
| 013 | [Signals](./013.%20Signals) | `signal`, `computed`, `effect`, `linkedSignal`, signal inputs, `output()`, `model()`, signal queries, `resource` and `httpResource` | 🟢 |
| 014 | [Angular Animations](./014.%20Angular%20Animations) | Enter and leave animations with the modern `animate.enter` / `animate.leave`, plus the older `@angular/animations` package (deprecated) kept in a `Deprecated/` folder for reference | 🟡 |
| 015 | [Service Workers](./015.%20Service%20Workers) | Offline support and caching with the Angular service worker | 🟢 |
| 016 | [Unit Testing](./016.%20Unit%20Testing) | Vitest, services, HTTP, components, inputs/outputs, directives, pipes | 🟢 |
| 017 | [A Closer Look at the Angular CLI](./017.%20A%20Closer%20look%20at%20the%20Angular%20CLI) | Config files, `angular.json`, schematics, `ng add`, `ng update`, builders, `ng deploy`, multiple projects and libraries | 🟡 |
| 018 | [The New Control Flow](./018.%20The%20new%20Control%20Flow) | `@if`, `@for`, `@switch`, the replacement for `*ngIf`/`*ngFor`/`*ngSwitch` | 🟢 |
| 019 | [Angular SSR](./019.%20Angular%20SSR) | Server-side rendering, hydration, static site generation | 🟢 |
| 020 | [Change Detection](./020.%20Change%20Detection) | How Angular checks for changes, `OnPush`, signals, zone.js and going zoneless | 🟢 |
| 021 | [Deferrable Views](./021.%20Deferrable%20Views) | `@defer`, triggers, prefetching, SSR and incremental hydration | 🟢 |

---

## 🏷️ Status labels

| Icon | Meaning |
|:----:|---------|
| 🟢 | Matches what the Angular team recommends today |
| 🟡 | Mostly current. Some notes teach an approach that still works but is **not recommended for new code** (each such note says so at the top) |
| 🔴 | **Legacy / deprecated.** Kept on purpose for reference |

Inside the notes you will see banners like:

> **Status: Still supported, but not recommended for new code.** The Angular team recommends signal-based `input()`, `output()` and `model()` for new components.

> **Status: Legacy (NgModule-based routing).** Still valid for older apps. See the standalone routing notes for the modern approach.

---

## 🚀 Running a sample project

Each sample project is a normal Angular workspace.

```bash
# 1. pick a section and open its project folder
cd "001. Components & Data Binding Deep Dive/cmp-databinding-final"

# 2. install dependencies
npm install

# 3. start the dev server
npm start        # same as: ng serve

# 4. run the unit tests (where a project has them)
npm test
```

Open <http://localhost:4200> and read the matching note while you explore the code.

> [!TIP]
> Requirements: a current Node.js LTS release and npm. The Angular CLI is installed with each project, so you can use `npx ng …` without a global install.

---

## 🗂️ Repository layout

```text
Angular/
├── 000. Recipe Project/
├── 001. Components & Data Binding Deep Dive/
│   ├── NOTES/                  ← numbered markdown notes, read in order
│   └── cmp-databinding-final/  ← runnable sample project
├── 002. Directives Deep Dive/
│   ├── NOTES/
│   └── directives-final/
├── …
└── 021. Deferrable Views/
```

Every section follows the same idea: **`NOTES/`** for reading, one or more **sample projects** for running.

---

## 🧠 How the notes are written

- Plain language first, code second. Each note focuses on a single idea.
- Code snippets mirror what the sample projects actually use.
- Claims about "what Angular recommends" are checked against the official docs at [angular.dev](https://angular.dev).
- Old patterns are never deleted from the notes if they still matter for understanding legacy code; they are labelled instead.

---

<div align="center">

Made for learning in public · ⭐ star the repo if the notes help you

</div>
