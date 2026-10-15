import { Page, Locator } from "@playwright/test";

export class Home_Page {
    private page: Page;
    private searchbox: Locator;
    private shoppingCart_Btn: Locator;
    private search_btn: Locator;
    private popUp_Item_Added: Locator;



    constructor(page: Page) {
        this.page = page;
        this.searchbox = this.page.locator('#small-searchterms');
        this.shoppingCart_Btn = this.page.locator('span:has-text("Shopping cart")');
        this.search_btn = this.page.getByRole('button', { name: 'Search' });
        this.popUp_Item_Added = this.page.getByText('The product has been added to your ');
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
}