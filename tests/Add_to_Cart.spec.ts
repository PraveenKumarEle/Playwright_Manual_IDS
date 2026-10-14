import { test, expect } from '@playwright/test';

const select_product = "14.1-inch Laptop";

//Select the product and add to cart
test('Add to cart', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
    await page.getByRole('link', { name: 'Log in' }).click();
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Email' }).fill('ele.shan0810@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(5000);
    await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
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
    await page.waitForTimeout(5000);
    const cartProduct = await page.locator('.product-name').innerText();
    if (cartProduct === select_product) {
        console.log('Product added to cart successfully');
    } else {
        console.log('Product not added to cart');
    }
});