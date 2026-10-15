import { test, expect } from '@playwright/test';
import { login_Page } from './pages/login_Page.js';
import { env } from '../config/env.js';

test('login', async ({ page }) => {
    const loginPage = new login_Page(page);
    await loginPage.homepage_URL();
    //await page.goto('https://demowebshop.tricentis.com/');
    await loginPage.navigate_To_Login_Page();
    await expect(await loginPage.Login_Btn()).toBeVisible();
    await loginPage.enter_Username(env.username);
    await loginPage.enter_Password(env.password);
    await loginPage.click_On_Login_Btn();
    await page.waitForTimeout(1000);
    await expect(await loginPage.verify_Post_Login_Page()).toBeVisible();

});