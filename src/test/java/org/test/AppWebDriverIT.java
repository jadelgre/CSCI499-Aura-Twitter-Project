package org.test;

import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;


/**
 * Verify app loads using WebDriver
 */
public class AppWebDriverIT {

    @Test
    public void testApp() throws Exception {
        WebDriver driver =  new FirefoxDriver();
        try {
        	driver.get("http://localhost:8080/twitter/twitter.app");

			WebDriverWait driverWait = new WebDriverWait(driver, 10);
			driverWait.until(ExpectedConditions.textToBePresentInElementLocated(By.cssSelector(".slds-feed__item"), testText));

	        Assert.assertTrue("Hello response is wrong", driver.getPageSource().contains("Twitter-ish"));
	        driver.close();
        } finally {
        	driver.close();
        }
        
    }
}
