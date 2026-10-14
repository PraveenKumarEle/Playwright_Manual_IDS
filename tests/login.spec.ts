import { test, expect } from '@playwright/test';
import { login_Page } from './pages/login_Page'
    const usernamevalue: string = "ele.shan0810@gmail.com";
    const passwordvalue: string = "Test@123";
/*
test('login', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
    await page.getByRole('link', { name: 'Log in' }).click();
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Email' }).fill('ele.shan0810@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(5000);
    await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
});
*/

test('login', async ({ page }) => {
    const loginPage = new login_Page(page);
    await page.goto('https://demowebshop.tricentis.com/');
    await loginPage.navigate_To_Login_Page();
    await expect(await loginPage.Login_Btn()).toBeVisible();
    await loginPage.enter_Username(usernamevalue);
    await loginPage.enter_Password(passwordvalue);
    await loginPage.click_On_Login_Btn();
    await page.waitForTimeout(1000);
    await expect(await loginPage.verify_Post_Login_Page()).toBeVisible();

});