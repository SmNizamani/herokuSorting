import { expect, Locator, Page } from "@playwright/test";

export class MiscPage {
    readonly page: Page
    readonly headerElement: Locator


    constructor(page: Page) {
        this.page = page
        this.headerElement = page.locator('#table1').getByText('Last Name')
    }

    async fetchUnsortedData() {
        const rows = await this.page.$$eval('#table1 tr', rows => {
            return rows.map(row => {
                const cells = Array.from(row.querySelectorAll('td, th')); // select both td and th elements
                return cells.map(cell => cell.textContent?.trim()); // extract text content and trim spaces
            });
        });
        return rows


    }

    async sortByLastName() {
        await this.headerElement.click()
    }

    async fetchUpdatedData() {
        const rows = await this.page.$$eval('#table1 tr', rows => {
            return rows.map(row => {
                const cells = Array.from(row.querySelectorAll('td, th')); // select both td and th elements
                return cells.map(cell => cell.textContent?.trim()); // extract text content and trim spaces
            });
        });
        return rows
    }
}