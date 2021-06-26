const puppeteer = require("puppeteer");

//IMPORTANT : The bot is ready to use and works for all but due to updates 
//of whatsapp, you may need to change the class name/ selector ( you can 
// find it in insopect elemnent) at lines 28,29 and 38.

// Login Function Logic
(async function main() {
    try {
        //For users. Just change the variable below to coustomize the code
        const contactNameInYourWhatsapp = "Chiggy Gang(Estd. 2010)"
        const messagesToSend = 50
        //define the message on line 45 inside loop on const msg

        // Configures puppeteer
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.setUserAgent(
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
        );
        console.log("Reached here 1")
        //Navigates to Whatsapp
        await page.goto("https://web.whatsapp.com/");

        // //Searches person by title, precisly, it search for chats area
        await page.waitForSelector("._1C2Q3");
        await delay(5000);
        console.log("Reached here 2")

        //Change to contact you want to send messages to
        const contactName = contactNameInYourWhatsapp
        await page.click(`span[title='${contactName}']`);
        await page.waitForSelector("._2A8P4");

        //Finds the message bar and focuses on it
        const editor = await page.$("div[data-tab='6']");
        //console.log(editor);
        await editor.focus();

        //Amount of messages you want to send
        const amt = messagesToSend;

        //Loops through cycle of sending message
        console.log("Reached here 3")
        for (var i = 0; i < amt; i++) {
            await page.evaluate(() => {
                const msg = "This is a bot, came to spam your inbox";
                document.execCommand("insertText", false, msg);
            });
            await page.click("span[data-testid='send']");
            await delay(500);
        }

        //for fun
        console.log("Hey bro, taak done ");

    } catch (e) {
        console.error("error mine", e);
    }
})();

function delay(time) {
    try {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    } catch (error) {
        console.log(error);
        return;
    }
}