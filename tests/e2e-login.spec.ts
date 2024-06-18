import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/LoginPage";

test.describe("Login and Logout Scnearios", () => {
    let loginPage:LoginPage
    //Go to link before each test case hook.
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        await loginPage.visit()
    }
    )

    test('Negative case for login', async ({ page }) => {
        await loginPage.login('wrong', 'right')
        await loginPage.assertErrorMessage()
    }
    )

    test('Positive case for login', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce')
        const accSummaryTab = await page.locator('.title')
        await expect(accSummaryTab).toHaveText('Products')
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    }
    )
}
)