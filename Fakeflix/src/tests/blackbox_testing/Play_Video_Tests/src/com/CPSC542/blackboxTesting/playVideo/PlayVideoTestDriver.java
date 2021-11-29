package com.CPSC542.blackboxTesting.playVideo;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class PlayVideoTestDriver {

	public static void main(String[] args) {
		System.setProperty("webdriver.chrome.driver", "chromedriver_mac64");
		
		WebDriver driver = new ChromeDriver();
	
		try {
			//launch Fakeflix
			driver.get("http://localhost:3000");
			driver.manage().window().maximize();
			log("Fakeflix started");
			sleep(1);
			
			/* log in with account */
			//set user email
			driver.findElement(By.name("email")).sendKeys("cpsc542_fakeflix_blackbox_tests@gmail.com");
			log("Seting email for login");
			sleep(1);
			
			//set user password
			driver.findElement(By.name("password")).sendKeys("blackbox_tests");
			log("Seting password for login");
			sleep(1);
			
			//click login button
			driver.findElement(By.className("SignIn__form--button")).click();
			log("logging in");
			sleep(10);
			
			/* Play video tests */
			//play from banner
			driver.findElement(By.xpath("//a[@class='Banner__button']")).click();
			log("Play from banner");
			sleep(10);
			
			//play from banner info
			driver.findElement(By.xpath("//button[@class='Banner__button']")).click();
			sleep(3);
			driver.findElement(By.xpath("//a[@class='Modal__image--button']")).click();
			log("Play from banner info");
			sleep(10);
			
			//play from video list item
			JavascriptExecutor js = (JavascriptExecutor) driver;
			js.executeScript("window.scrollBy(0,250)", "");
			sleep(3);
			
			List<WebElement> movieList = driver.findElements(By.className("swiper-slide"));
			Actions action = new Actions(driver);
			action.moveToElement(movieList.get(0)).perform();
			sleep(3);
			
			List<WebElement> playIconList = driver.findElements(By.className("icon--play"));
			playIconList.get(0).click();
			log("Play from video list item");
			sleep(10);
			
			//play from video list item info
			js.executeScript("window.scrollBy(0,250)", "");
			sleep(3);
			
			movieList = driver.findElements(By.className("swiper-slide"));
			action = new Actions(driver);
			action.moveToElement(movieList.get(0)).perform();
			sleep(3);
			
			List<WebElement> infoIconList = driver.findElements(By.className("icon--toggleModal"));
			infoIconList.get(0).click();
			sleep(2);
			
			driver.findElement(By.xpath("//a[@class='Modal__image--button']")).click();
			log("Play from video list item info");
			sleep(10);
			
			log("Play video tests succeeded");
		} catch (Exception e) {
			log("Play video tests failed");
			log(e.getMessage());
		} finally {
			driver.close();
		}
	}
	
	private static void sleep(int timeInSeconds) {
		try {
			Thread.sleep(timeInSeconds * 1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
	
	private static void log(String message) {
		System.out.println(message);
	}

}
