import { Page, Locator } from "@playwright/test";

export class Search_Page {
    private page: Page;

    private add_to_cart_Button: Locator;
    private products_list_SearchPage: Locator;
    private health_book_SearchPage: Locator;
    private product_Name_SearchPage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.add_to_cart_Button = this.page.getByRole('button', { name: 'Add to cart' });
        this.products_list_SearchPage = this.page.locator('.product-selectors');
        this.health_book_SearchPage = this.page.getByRole('link', { name: 'Health Book', exact: true });
        this.product_Name_SearchPage = this.page.locator('h2');
    }

    async add_To_Cart_Btn() {
        await this.add_to_cart_Button.click();
    }
    async Searchpage_Products_List() {
        return this.products_list_SearchPage;
    }
    async Searchpage_Result_HealthBook() {
        return this.health_book_SearchPage
    }

    async get_ProductName_search_Page() {
        return this.product_Name_SearchPage;
    }
}