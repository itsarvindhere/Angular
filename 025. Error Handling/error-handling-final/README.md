# error-handling-final

Sample project for the **Error Handling** notes. One page with a button for each way an error can happen, and a table that shows which errors reached the global `ErrorHandler`.

| Note | Where to see it |
|------|-----------------|
| 001 The ErrorHandler | [`src/app/global-error-handler.ts`](src/app/global-error-handler.ts) and its registration in [`src/app/app.config.ts`](src/app/app.config.ts) |
| 002 Global error listeners | `provideBrowserGlobalErrorListeners()` in `app.config.ts`, buttons 2 and 3 |
| 003 Errors in async code and resources | button 4 (async pipe) and button 6 (resource) in [`src/app/app.html`](src/app/app.html) and [`app.ts`](src/app/app.ts) |
| 004 Startup errors and tests | [`src/app/app.spec.ts`](src/app/app.spec.ts) |

## Run it

```bash
npm install
npm start
npm test
```

## What each button does

| Button | What happens | Reaches the global handler? |
|--------|--------------|:---:|
| 1. Throw in a click handler | Angular runs the handler, so it catches the error | yes |
| 2. Unhandled promise rejection | the window `unhandledrejection` event, forwarded by `provideBrowserGlobalErrorListeners()` | yes |
| 3. Throw inside `setTimeout` | the window `error` event, forwarded the same way | yes |
| 4. Fail inside the async pipe | the `async` pipe forwards errors from its observable | yes |
| 5. Parse bad JSON | caught with `try/catch`, the user gets a message | no |
| 6. Load from a server that is down | `httpResource` keeps the error in its own `error()` state | no |

Buttons 5 and 6 are the lesson: expected errors are handled where they happen, and a resource never forwards its error, so the template has to read `error()`.

Everything is logged by `GlobalErrorHandler` into a small `ErrorLog` service, so the page can show the entries. A real app would send them to a tracking service instead.

The server for button 6 is `http://localhost:1`. Nothing listens there, so the request fails straight away.
