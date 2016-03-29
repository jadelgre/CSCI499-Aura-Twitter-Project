package org.test;

import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

import javax.lang.model.element.Element;
import javax.lang.model.util.Elements;
import java.util.List;


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
            // wait until we've started loading feed elements so we know that static content is already loaded
			driverWait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".slds-feed__item")));

	        Assert.assertTrue("Navbar contents are wrong.", driver.getPageSource().contains("Twitter-ish"));


        } finally {
        	driver.close();
        }
        
    }

    @Test // checks tweet feed for existance of oldest tweet
    public void testTweetFeed() throws Exception {
        WebDriver driver =  new FirefoxDriver();
        try {
            driver.get("http://localhost:8080/twitter/twitter.app");

            WebDriverWait driverWait = new WebDriverWait(driver, 10);
            // wait until we've started loading feed elements so we know that static content is already loaded
            driverWait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".slds-feed__item")));

            Assert.assertTrue("Couldn't find expected tweet 'If there's anything more important' ...", driver.getPageSource().contains("If there's anything more important"));


        } finally {
            driver.close();
        }
    }

    @Test
    public void testProfileFeed() throws Exception {
        WebDriver driver =  new FirefoxDriver();
        try {
            driver.get("http://localhost:8080/twitter/twitter.app");

            WebDriverWait driverWait = new WebDriverWait(driver, 10);
            // wait until we've started loading feed elements so we know that static content is already loaded
            driverWait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".slds-feed__item")));

            // click on the user profile for root
            driver.findElement(By.linkText("root")).click();

            // wait for the modal to be shown
            driverWait = new WebDriverWait(driver, 10);

            // wait until the body of the modal has loaded
            driverWait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("div[class='modal-body scrollable']")));
            System.out.println("Made it past wait for modal");

            // get all of the tweets in that user's profile
            List<WebElement> temp = driver.findElements(By.cssSelector("li[class='slds-feed__item'"));

            int helloCount = 0;
            for(int i = 0; i < temp.size(); i++) {
                if(temp.get(i).toString().contains("hello world! This is my first tweet!")) {
                    helloCount += 1;
                    System.out.println(temp.get(i).toString());
                };
            }

            Assert.assertEquals(2, helloCount); // "Error: wrong number of hello world tweets, not found in user profile"); // actual, expected, error
            // get the last tweet
//            WebElement tweet = temp.get(temp.size() - 1);
//            Assert.assertTrue("Could not find Hello World tweet for user root.", tweet.getText().equals("hello world! This is my first tweet!"));


        } finally {
            driver.close();
        }

    }
}
