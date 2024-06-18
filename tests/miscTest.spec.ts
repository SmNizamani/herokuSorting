import { test, expect } from "@playwright/test";
import { MiscPage } from "../page-objects/MiscPage";

test.describe.only("Misc Scenarios", () => {
    let miscObj: MiscPage
    //Go to link before each test case hook.
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/tables')
    }
    )

    test('Sort and compare table data', async ({ page }) => {
        miscObj = new MiscPage(page)

        const oldData = await miscObj.fetchUnsortedData()
        console.log('Initial table data:');
        console.log(oldData)

        await miscObj.sortByLastName()

        //const newData = await miscObj.fetchUpdatedData()
        const newData = await miscObj.fetchUnsortedData()
        console.log('Sorted table data:');
        console.log(newData)


        const isDataSame = JSON.stringify(oldData) === JSON.stringify(newData);
        if (isDataSame) {
            console.log('Initial and sorted table data are the same.');
        } else {
            console.error('Initial and sorted table data are NOT the same.');
        }


    })
}
)