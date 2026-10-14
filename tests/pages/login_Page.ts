import { Page, Locator } from '@playwright/test';

export class login_Page {
    private readonly page: Page;
    private readonly loginLink: Locator;
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly submit_btn: Locator;
    private readonly logOutLink: Locator;


    constructor(page: Page) {
        this.page = page;
        this.loginLink = this.page.getByRole('link', { name: 'Log in' });
        this.username = this.page.getByRole('textbox', { name: 'Email' });
        this.password = this.page.getByRole('textbox', { name: 'Password' });
        this.submit_btn = this.page.getByRole('button', { name: 'Log in' });
        this.logOutLink = this.page.getByRole('link', { name: 'Log Out' });
    }

    async navigate_To_Login_Page() {
        await this.loginLink.click();
    }

    async enter_Username(usernamevalue: string) {
        await this.username.click();
        await this.username.fill(usernamevalue);
    }

    async enter_Password(password_value: string) {
        await this.password.click();
        await this.password.fill(password_value);
    }

    async click_On_Login_Btn() {
        await this.submit_btn.click();
    }

    async Login_Btn() {
        return await this.submit_btn;
    }

    async verify_Post_Login_Page() {
        return this.logOutLink;
    }
}