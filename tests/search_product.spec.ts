import { test, expect } from '@playwright/test';
import { login_Page } from './pages/login_Page.js';
import { Home_Page } from './pages/home_Page.js';
import {Search_Page} from './pages/search_Page.js';
import { env } from '../config/env.js';
/*
const search_Product = 'Health Book';

test('search functionality', async ({ page }) => {

    await page.goto('https://demowebshop.tricentis.com/');
    await page.getByRole('link', { name: 'Log in' }).click();
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Email' }).fill('ele.shan0810@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(3000);
    await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
    let serach_box = await page.locator('#small-searchterms');
    serach_box.fill(search_Product);
    //await page.locator('.button-1 search-box-button').click();
    await page.getByRole('button', { name: 'Search' }).click();
    await page.waitForTimeout(3000);
    await expect(page.locator('.product-selectors')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Health Book', exact: true })).toBeVisible();
    await expect(page.locator('h2')).toContainText(search_Product);
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await page.waitForTimeout(3000);
    const paragraph = page.getByText('The product has been added to your ');
    await expect(paragraph).toBeVisible();
    const Shopping_cart_btn = await page.locator('span:has-text("Shopping cart")');
    await Shopping_cart_btn.click();
    await page.waitForTimeout(3000);

    //Removing other products from cart list
    const product_list_In_cart = await page.locator('.cart-item-row');
    const productCount = await product_list_In_cart.count();
    console.log(`Product count is ${productCount}`);
    for (let i = 0; i < productCount; i++) {
        const specific_product = product_list_In_cart.nth(i);
        const name = await specific_product.locator('.product-name').innerText();
        if (name !== search_Product) {
            const qty = await specific_product.locator('.qty-input');
            await qty.clear();
            await qty.fill('0');
            if (i === (productCount - 1)) {
                await qty.press('Enter');
            }
        } else {
            const qty = await specific_product.locator('.qty-input');
            await qty.clear();
            await qty.fill('1');
            if (i === (productCount - 1)) {
                await qty.press('Enter');
            }
        }
    }
    await page.waitForTimeout(3000);
    const cartProduct = await page.locator('.product-name').innerText();
    if (cartProduct === search_Product) {
        console.log('Product added to cart successfully');
    } else {
        console.log('Product not added to cart');
    }
    const countrydrpdown = await page.locator('#CountryId');
    await expect(countrydrpdown).toBeVisible();
    await countrydrpdown.selectOption({ label: 'India' });
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Estimate shipping' }).click();
    await expect(page.getByText('Compared to other shipping')).toBeVisible();
    const terms_conditions = await page.locator('#termsofservice');
    terms_conditions.check();
    await page.waitForTimeout(2000)
    await expect(terms_conditions).toBeChecked();
    await page.locator('#checkout').click();
    //await page.waitForTimeout(2000);
    const currentUrl: string = page.url();
    console.log(currentUrl); // https://demowebshop.tricentis.com/onepagecheckout

    // Standard assertion to verify the URL
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/onepagecheckout');
});
*/
const search_Product = 'Health Book';

test('search functionality', async ({ page }) => {

    const loginPage = new login_Page(page);
    const homePage = new Home_Page(page);
    const searchPage = new Search_Page(page);
    await loginPage.homepage_URL();
    await loginPage.navigate_To_Login_Page();
    expect(await loginPage.Login_Btn()).toBeVisible();
    await loginPage.enter_Username(env.username);
    await loginPage.enter_Password(env.password);
    await loginPage.click_On_Login_Btn();
    await page.waitForTimeout(1000);
    await expect(await loginPage.verify_Post_Login_Page()).toBeVisible();
    await homePage.fill_Search_Box(search_Product);
    await homePage.click_Search_Button();
    await page.waitForTimeout(3000);
    expect( await searchPage.Searchpage_Products_List()).toBeVisible();
    expect( await searchPage.Searchpage_Result_HealthBook()).toBeVisible();
    expect( await searchPage.get_ProductName_search_Page()).toContainText(search_Product);
    await searchPage.add_To_Cart_Btn();
    await page.waitForTimeout(3000);
    expect( await homePage.popUp_Product_Add_To_Cart()).toBeVisible();
    await homePage.click_Shopping_cart_btn();
    await page.waitForTimeout(3000);

    //Removing other products from cart list
    const product_list_In_cart = await page.locator('.cart-item-row');
    const productCount = await product_list_In_cart.count();
    console.log(`Product count is ${productCount}`);
    for (let i = 0; i < productCount; i++) {
        const specific_product = product_list_In_cart.nth(i);
        const name = await specific_product.locator('.product-name').innerText();
        if (name !== search_Product) {
            const qty = await specific_product.locator('.qty-input');
            await qty.clear();
            await qty.fill('0');
            if (i === (productCount - 1)) {
                await qty.press('Enter');
            }
        } else {
            const qty = await specific_product.locator('.qty-input');
            await qty.clear();
            await qty.fill('1');
            if (i === (productCount - 1)) {
                await qty.press('Enter');
            }
        }
    }
    await page.waitForTimeout(3000);
    const cartProduct = await page.locator('.product-name').innerText();
    if (cartProduct === search_Product) {
        console.log('Product added to cart successfully');
    } else {
        console.log('Product not added to cart');
    }
    const countrydrpdown = await page.locator('#CountryId');
    await expect(countrydrpdown).toBeVisible();
    await countrydrpdown.selectOption({ label: 'India' });
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Estimate shipping' }).click();
    await expect(page.getByText('Compared to other shipping')).toBeVisible();
    const terms_conditions = await page.locator('#termsofservice');
    terms_conditions.check();
    await page.waitForTimeout(2000)
    await expect(terms_conditions).toBeChecked();
    await page.locator('#checkout').click();
    //await page.waitForTimeout(2000);
    const currentUrl: string = page.url();
    console.log(currentUrl); // https://demowebshop.tricentis.com/onepagecheckout

    // Standard assertion to verify the URL
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/onepagecheckout');
});