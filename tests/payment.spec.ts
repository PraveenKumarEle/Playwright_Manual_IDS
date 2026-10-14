import { test, expect } from '@playwright/test';

const select_product = "14.1-inch Laptop";

//Select the product and add to cart and payment
test('Payment', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
    await page.getByRole('link', { name: 'Log in' }).click();
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Email' }).fill('ele.shan0810@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(5000);
    await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();

    //Selecting product from products list from Home page
    const product = await page.locator('.product-item');
    const productCount = await product.count();
    for (let i = 0; i < productCount; i++) {
        const specific_product = product.nth(i);
        const name = await specific_product.locator('.product-title').innerText();
        if (name === select_product) {
            const specific_product_button = await page.getByRole('button', { name: 'Add to cart' }).nth(i);
            await expect(specific_product_button).toBeVisible();
            await specific_product_button.click();
            await page.waitForTimeout(1000);
            const paragraph = page.getByText('The product has been added to your ');
            await expect(paragraph).toBeVisible();
            break;
        }
    }
    const Shopping_cart_btn = await page.locator('span:has-text("Shopping cart")');
    await Shopping_cart_btn.click();
    await page.waitForTimeout(3000);

    //Removing other products from cart list
    const product_list_In_cart = await page.locator('.cart-item-row');
    const productCount_in_cart = await product_list_In_cart.count();
    console.log(`Product count is ${productCount_in_cart}`);
    for (let i = 0; i < productCount_in_cart; i++) {
        const specific_product = product_list_In_cart.nth(i);
        const name = await specific_product.locator('.product-name').innerText();
        const qty = await specific_product.locator('.qty-input');
        if (name !== select_product) {
            await qty.clear();
            await qty.fill('0');
        }
        if (i === (productCount_in_cart - 1)) {
            await qty.press('Enter');
        }

    }
    await page.waitForTimeout(5000);
    const cartProduct = await page.locator('.product-name').innerText();
    if (cartProduct === select_product) {
        console.log('Product added to cart successfully');
    } else {
        console.log('Product not added to cart');
    }
    const initial_total_amount: any = await page.locator('.product-unit-price').textContent();
    console.log(initial_total_amount);
    //const qty = page.getByRole('textbox', {name:'itemquantity7149410'});
    const qty = await page.locator('.qty-input');
    await qty.clear();
    await qty.fill('2');
    await qty.press('Enter');
    await page.waitForTimeout(3000);
    const total_cal_amount: any = initial_total_amount * 2;
    const cart_sum_total: any = await page.locator('.product-subtotal').textContent();
    if (total_cal_amount == cart_sum_total) {
        console.log("Cart Total: " + cart_sum_total);
        console.log("Calculated Total: " + total_cal_amount);
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
    const currentUrl: string = await page.url();
    console.log(currentUrl); // https://demowebshop.tricentis.com/onepagecheckout

    // Standard assertion to verify the URL
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/onepagecheckout');

});