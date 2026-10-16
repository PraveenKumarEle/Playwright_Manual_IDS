import { Page, Locator } from "@playwright/test";

export class Home_Page {
    private page: Page;
    private searchbox: Locator;
    private shoppingCart_Btn: Locator;
    private search_btn: Locator;
    private popUp_Item_Added: Locator;
    private current_url: string;
    



    constructor(page: Page) {
        this.page = page;
        this.searchbox = this.page.locator('#small-searchterms');
        this.shoppingCart_Btn = this.page.locator('span:has-text("Shopping cart")');
        this.search_btn = this.page.getByRole('button', { name: 'Search' });
        this.popUp_Item_Added = this.page.getByText('The product has been added to your ');
        this.current_url = this.page.url();
    }

    async select_product_from_Homepage(select_product : string){
                
            const product = await this.page.locator('.product-item');
            const productCount = await product.count();
            console.log(`Product count is ${productCount}`);
            for (let i = 0; i < productCount; i++) {
                const specific_product = product.nth(i);
                const name = await specific_product.locator('.product-title').innerText();
                if (name === select_product) {
                    const specific_product_button = await this.page.getByRole('button', { name: 'Add to cart' }).nth(i);
                    //await expect(specific_product_button).toBeVisible();
                    await specific_product_button.click();
                    await this.page.waitForTimeout(1000);
                    //const paragraph = page.getByText('The product has been added to your ');
                    //await expect(paragraph).toBeVisible();
                    break;
                }
            } 
    }


    async fill_Search_Box(productname: string) {
        await this.searchbox.clear();
        await this.searchbox.fill(productname);
    }
    async click_Search_Button() {
        await this.search_btn.click();
    }
    async click_Shopping_cart_btn() {
        await this.shoppingCart_Btn.click();
    }
    async popUp_Product_Add_To_Cart() {
        return this.popUp_Item_Added;
    }
    async get_Current_Url() {
        console.log('Current URL : ' + this.current_url);
        return this.current_url;
    }
}