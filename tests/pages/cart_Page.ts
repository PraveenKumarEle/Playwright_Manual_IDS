import { Page, Locator } from "@playwright/test";

export class Cart_Page {
    private page: Page;

    private products_list_CartPage: Locator;
    private select_country_dropdown: Locator;
    private estimate_Shipping_btn: Locator;
    private estimate_text: Locator;
    private terms_and_Conditions_checkBox: Locator;
    private checkout_Btn : Locator;


    constructor(page: Page) {
        this.page = page;
        this.products_list_CartPage = this.page.locator('.cart-item-row');
        this.select_country_dropdown = this.page.locator('#CountryId');
        this.estimate_Shipping_btn = this.page.getByRole('button', { name: 'Estimate shipping' });
        this.estimate_text = this.page.getByText('Compared to other shipping');
        this.terms_and_Conditions_checkBox = this.page.locator('#termsofservice');
        this.checkout_Btn = this.page.locator('#checkout');
    }

    async get_Product_Count() {
        return await this.products_list_CartPage.count();
    }
    async country_dropdown() {
        return this.select_country_dropdown;
    }
    async select_country() {
        await this.select_country_dropdown.selectOption({ label: 'India' });
    }

    async click_estimate_btn() {
        await this.estimate_Shipping_btn.click();
    }

    async validate_estimate_text() {
        return this.estimate_text;
    }
    async check_Terms_and_COnditions() {
        return this.terms_and_Conditions_checkBox.check();
    }

    async Terms_and_COnditions() {
        return this.terms_and_Conditions_checkBox;
    }
    async click_CheckOut_Btn() {
        await this.checkout_Btn.click();
    }
    async set_Quantity_for_Selected_Product(search_Product: string) {
        const productCount = await this.products_list_CartPage.count();
        console.log(`Product count is ${productCount}`);
        for (let i = 0; i < productCount; i++) {
            const specific_product = this.products_list_CartPage.nth(i);
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
        await this.page.waitForTimeout(3000);
        const cartProduct = await this.page.locator('.product-name').innerText();
        if (cartProduct === search_Product) {
            console.log('Product added to cart successfully');
        } else {
            console.log('Product not added to cart');
        }
    }

    async calculate_Total_Cart_Sum(){
            const initial_total_amount: any = await this.page.locator('.product-unit-price').textContent();
            console.log(initial_total_amount);
            //const qty = page.getByRole('textbox', {name:'itemquantity7149410'});
            const qty = await this.page.locator('.qty-input');
            await qty.clear();
            await qty.fill('2');
            await qty.press('Enter');
            await this.page.waitForTimeout(3000);
            const total_cal_amount: any = initial_total_amount * 2;
            const cart_sum_total: any = await this.page.locator('.product-subtotal').textContent();
            if (total_cal_amount == cart_sum_total) {
                console.log("Cart Total: " + cart_sum_total);
                console.log("Calculated Total: " + total_cal_amount);
            }
    }
}