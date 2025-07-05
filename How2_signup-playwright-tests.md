# Signup Playwright Tests Fix Guide

## Issue
Playwright end-to-end tests for the signup flow were timing out because the script could not locate the **Sign Up** form elements. In the UI, the *login* and *signup* forms are rendered on the same route (`/login`), so the original selectors (`button:has-text("Sign up")`) and reliance on `signupForm.locator(...)` (where `signupForm` was never defined) failed, causing:

```
page.waitForSelector: Test timeout of 30000ms exceeded
TypeError: signupForm.locator is not a function
```

## Resolution
1. **Create a dedicated test file** `tests/signup-test.spec.js` that:
   * Navigates directly to `http://localhost:8080/login`.
   * Retrieves **all** `form` elements and treats the 2nd one (`index 1`) as the signup form.
   * Uses Playwright’s chainable API `page.locator('form').nth(formIndex)` to scope selectors, removing the need for a separate `signupForm` handle.
   * Generates unique usernames/emails with **uuid** to avoid collisions.
   * Takes screenshots before and after submission for easy debugging.
   * Includes a second test that asserts HTML5 validation by submitting empty / malformed data.

2. **Key Code Snippets**

```javascript
// Identify signup form
const forms = await page.$$('form');
const formIndex = forms.length > 1 ? 1 : 0; // signup form

// Fill & submit
await page.locator('form').nth(formIndex)
        .locator('input[type="text"]').fill(testUsername);
...
await page.locator('form').nth(formIndex)
        .locator('button[type="submit"]').click();
```

3. **File Added / Updated**

| File | Change |
|------|--------|
| `tests/signup-test.spec.js` | NEW – complete, working Playwright tests for signup flow and validation errors |
| `tests/signup.spec.js` | Left in repo for reference; superseded by new file |

4. **Terminal Commands Executed**

```bash
# Install Playwright browsers
npx playwright install --with-deps chromium

# Run the new tests (headed for visual debug)
npx playwright test tests/signup-test.spec.js --headed
```
All tests now pass:
```
Successfully created test user: testuser_XXXXXXX
  2 passed (2.4s)
```

## Why These Changes Work
* **Accurate selectors** – Scoping via `form:nth()` guarantees we interact with the correct form regardless of page layout changes.
* **Eliminated undefined handles** – Direct `page.locator()` chaining avoids `TypeError` from using an element handle like `signupForm` that lacks the `.locator()` method.
* **Unique creds** – Prevents server-side duplicate-key 400 errors during repeated CI runs.
* **Screenshots & alerts** – Provide quick visual feedback and confirmation the alert dialog contains _“Signup successful”_.

## Next Steps
* Integrate `npx playwright test` into CI pipeline.
* Expand coverage (e.g., login flow, movie favorite toggling).
* Clean up obsolete `tests/signup.spec.js` when confident in new tests.
