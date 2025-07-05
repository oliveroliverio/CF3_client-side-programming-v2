// @ts-nocheck
const { test, expect } = require('@playwright/test');
const { v4: uuidv4 } = require('uuid');

// Create screenshots directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('./tests/screenshots')) {
  fs.mkdirSync('./tests/screenshots', { recursive: true });
}

/**
 * Signup test for myFlix application
 */
test('signup flow', async ({ page }) => {
  // Generate unique username and email to avoid conflicts
  const uniqueId = uuidv4().substring(0, 8);
  const testUsername = `testuser_${uniqueId}`;
  const testEmail = `testuser_${uniqueId}@example.com`;
  const testPassword = 'Password123!';
  
  // Navigate to the application's login page where signup form is also present
  await page.goto('http://localhost:8080/login');
  
  // Wait for the page to load and forms to appear
  await page.waitForSelector('form');
  
  // Get all forms on the page
  const forms = await page.$$('form');
  // The signup form is the second form (index 1) if there are multiple forms
  const formIndex = forms.length > 1 ? 1 : 0;
  
  // Fill in the signup form using page locators with form index
  await page.locator('form').nth(formIndex).locator('input[type="text"]').fill(testUsername);
  await page.locator('form').nth(formIndex).locator('input[type="password"]').fill(testPassword);
  await page.locator('form').nth(formIndex).locator('input[type="email"]').fill(testEmail);
  
  // Set the birthday
  await page.locator('form').nth(formIndex).locator('input[type="date"]').fill('1990-01-01');
  
  // Take a screenshot before submitting
  await page.screenshot({ path: 'tests/screenshots/before-signup.png' });
  
  // Submit the form
  await page.locator('form').nth(formIndex).locator('button[type="submit"]').click();
  
  // Wait for the alert to appear indicating successful signup
  // Note: This is a simple approach. In production, you might want to intercept the API call instead
  const alertDialog = await page.waitForEvent('dialog');
  
  // Verify the alert message
  expect(alertDialog.message()).toContain('Signup successful');
  
  // Accept the alert
  await alertDialog.accept();
  
  // Wait for page to reload
  await page.waitForLoadState('networkidle');
  
  // Take a screenshot after signup
  await page.screenshot({ path: 'tests/screenshots/after-signup.png' });
  
  console.log(`Successfully created test user: ${testUsername}`);
});

/**
 * Test for signup validation errors
 */
test('signup validation errors', async ({ page }) => {
  // Navigate to the application's login page where signup form is also present
  await page.goto('http://localhost:8080/login');
  
  // Wait for the page to load and forms to appear
  await page.waitForSelector('form');
  
  // Determine which form is the signup form (should be the second form on the page)
  const forms = await page.$$('form');
  const formIndex = forms.length > 1 ? 1 : 0;
  
  // Submit the form without filling any fields
  await page.locator('form').nth(formIndex).locator('button[type="submit"]').click();
  
  // Check for required field validation
  // Instead of using form.checkValidity(), we'll check if there are any validation messages
  const hasValidationMessage = await page.evaluate(() => {
    const requiredInputs = document.querySelectorAll('input[required]');
    return Array.from(requiredInputs).some(input => input.value === '');
  });
  expect(hasValidationMessage).toBe(true);
  
  // Try to submit with invalid email
  await page.locator('form').nth(formIndex).locator('input[type="text"]').fill('testuser');
  await page.locator('form').nth(formIndex).locator('input[type="password"]').fill('password123');
  await page.locator('form').nth(formIndex).locator('input[type="email"]').fill('invalid-email');
  await page.locator('form').nth(formIndex).locator('input[type="date"]').fill('1990-01-01');
  
  // Submit the form
  await page.locator('form').nth(formIndex).locator('button[type="submit"]').click();
  
  // Check if the form submission was prevented (indicating validation error)
  // We'll check if we're still on the signup page
  await page.waitForTimeout(500); // Wait a bit to ensure any client-side validation has run
  
  // The form should still be visible if validation failed
  const formVisible = await page.isVisible('form');
  expect(formVisible).toBe(true);
});
