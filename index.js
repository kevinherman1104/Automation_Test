const wdio = require('webdriverio');
const assert = require("assert");
const opts = {
    capabilities: {
        browserName : 'chrome',
    },

};

async function main(){
    const browser = await wdio.remote(opts);
    let status;
    let element;
    // Given I am on web page
    await browser.url("www.traveloka.com");
    
    // When I am on traveloka home page
    status = await browser.$("(//div[@data-testid='desktop-promo-carousel-img-card'])[1]").waitForDisplayed();
    assert.equal(status, true);

    // And click on the Transports navigation menu
    await browser.$("//div[.='Transports']").click();

    // Then I can see the drop down list of transport feature menu
    status = await browser.$("(//a[@href='/en-id/flight'])[1]").waitForDisplayed();
    assert.equal(status, true);

    // When I click on the Flights menu 
    await browser.$("(//a[@href='/en-id/flight'])[1]").click()

    // Then I am on Flights page
    status  = await browser.$("//div[@data-testid='desktop-default-search-button']").waitForDisplayed();
    assert.equal(status, true);

    // Then I can see Round trip checkbox clicked (Only check cause by default has been auto-checked)
    element = await browser.$("div.css-1dbjc4n.r-1fuqb1j.r-d045u9.r-1472mwg.r-u8s1d.r-lrsllp");
    assert(element, true);
    await browser.pause(1000);
    
    
    

    // And I click on Search Button
    await browser.$("//div[@data-testid='desktop-default-search-button']").click();

    // Then I am on flights search flight result page
    status = await browser.$("//div[.='Change search']").waitForDisplayed();
    assert(status, true);


    // Then i click on the Change Search button
    element = await browser.$$("//div[.='Change search']");
    await element[1].click();

    // Then i change the value of From text field with value“LBJ”
    await browser.$("//input[@data-testid='airport-input-departure']").click();

    await browser.$("//input[@data-testid='airport-input-departure']").setValue("LBJ");
    await browser.pause(2500);
    await browser.keys(wdio.Key.Enter);



    // Then i change the value of To text field with value “LHR”
    await browser.$("//input[@data-testid='airport-input-destination']").clearValue();

    await browser.$("//input[@data-testid='airport-input-destination']").setValue("LHR");
    await browser.pause(2500);
    await browser.keys(wdio.Key.Enter);
    
    //When I click on the search button
    await browser.$("//div[@data-testid='desktop-default-search-button']").click();

    //Then I can see the “No Flight Available” is displayed
    status = await browser.$("//h2[.='No flights available']").waitForDisplayed();

    assert(status, true);


}
main().then(() => console.log("Success!"));
