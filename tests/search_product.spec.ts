import { test, expect } from '@playwright/test';
import { login_Page } from './pages/login_Page.js';
import { Home_Page } from './pages/home_Page.js';
import { Search_Page } from './pages/search_Page.js';
import { Cart_Page } from './pages/cart_Page.js';
import { env } from '../config/env.js';

const search_Product = 'Health Book';
const Payment_Url = 'https://demowebshop.tricentis.com/onepagecheckout';

test('search functionality', async ({ page }) => {

    const loginPage = new login_Page(page);
    const homePage = new Home_Page(page);
    const searchPage = new Search_Page(page);
    const cartpage = new Cart_Page(page);

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
    expect(await searchPage.Searchpage_Products_List()).toBeVisible();
    expect(await searchPage.Searchpage_Result_HealthBook()).toBeVisible();
    expect(await searchPage.get_ProductName_search_Page()).toContainText(search_Product);
    await searchPage.add_To_Cart_Btn();
    await page.waitForTimeout(3000);
    expect(await homePage.popUp_Product_Add_To_Cart()).toBeVisible();
    await homePage.click_Shopping_cart_btn();
    await page.waitForTimeout(3000);

    //Set Quantity
    await cartpage.set_Quantity_for_Selected_Product(search_Product);
    expect(await cartpage.country_dropdown()).toBeVisible();

    //Select Country
    await cartpage.select_country();
    await page.waitForTimeout(1000);
    await cartpage.click_estimate_btn();
    expect(await cartpage.validate_estimate_text()).toBeVisible();
    await cartpage.check_Terms_and_COnditions()
    await page.waitForTimeout(2000)
    expect(await cartpage.Terms_and_COnditions()).toBeChecked();
    await cartpage.click_CheckOut_Btn();
    //await page.waitForTimeout(2000);
    await homePage.get_Current_Url(); // https://demowebshop.tricentis.com/onepagecheckout

    // Standard assertion to verify the URL
    await expect(page).toHaveURL(Payment_Url);
});