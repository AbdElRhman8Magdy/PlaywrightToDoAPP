import test, { expect } from "@playwright/test";

test('Addtodo', async ({ page }) => {
 
  await page.goto('https://todo.qacart.com/login');

  await page.getByTestId('email').fill('abdelrhman88magdyzzz@gmail.com');

  await page.getByTestId('password').fill('12345678');
  await page.getByTestId('submit').click();

  
  await page.getByRole('heading', { name: 'Add a new Todo' }).click();
  await page.getByLabel('delete').click();
  await page.getByTestId('new-todo').fill('ddd');
  await page.getByTestId('submit-newTask').click();
  await page.getByLabel('delete').click();

  await page.getByTestId('new-todo').fill('NEw7mada');
  await page.getByTestId('submit-newTask').click();
  // await expect(page.getByTestId('todo-text')).toContainText('NEw7mada');
  const todoText = await page.locator('[data-testid="todo-item"]')
  .nth(0).
  innerText();
   expect(todoText).toEqual("NEw7mada")
  await page.getByTestId('delete').nth(0).click();
  // await page.getByText('ddd').getByTestId('delete').click();
   await page.reload();
  await page.getByTestId('delete').click();
  await page.reload();
 
  const noToDoMessage = await page.getByTestId('no-todos')
  await expect (noToDoMessage).toBeVisible();

});