import { test, expect } from '@playwright/test';
import { login_Page } from './pages/login_Page.js';
import { Home_Page } from './pages/home_Page.js';
import { Cart_Page } from './pages/cart_Page.js';
import { env } from '../config/env.js';

const select_product = "14.1-inch Laptop";

//Select the product and add to cart
test('Add to cart', async ({ page }) => {
    const loginPage = new login_Page(page);
    const homePage = new Home_Page(page);
    const cartpage = new Cart_Page(page);

    await loginPage.homepage_URL();
    await loginPage.navigate_To_Login_Page();
    expect(await loginPage.Login_Btn()).toBeVisible();
    await loginPage.enter_Username(env.username);
    await loginPage.enter_Password(env.password);
    await loginPage.click_On_Login_Btn();
    await page.waitForTimeout(1000);
    await expect(await loginPage.verify_Post_Login_Page()).toBeVisible();

    //Selecting product from products list from Home page
    await homePage.select_product_from_Homepage(select_product);
    expect(await homePage.popUp_Product_Add_To_Cart()).toBeVisible();
    await homePage.click_Shopping_cart_btn();
    await cartpage.set_Quantity_for_Selected_Product(select_product);
});