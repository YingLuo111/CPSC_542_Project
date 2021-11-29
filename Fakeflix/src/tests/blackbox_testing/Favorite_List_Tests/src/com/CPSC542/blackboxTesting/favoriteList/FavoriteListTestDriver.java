package com.CPSC542.blackboxTesting.favoriteList;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class FavoriteListTestDriver {

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
			
			/* favorite list functional tests */
			//add favorite movie from banner info
			driver.findElement(By.xpath("//button[@class='Banner__button']")).click();
			sleep(3);
			driver.findElement(By.xpath("//button[@class='Modal__image--button-circular']")).click();
			log("Add favorite movie from banner info");
			sleep(3);
			
			driver.findElement(By.xpath("//button[@class='Modal__closebtn']")).click();
			log("Closing banner info");
			sleep(3);
			
			driver.findElement(By.xpath("//a[@href='/mylist']")).click();
			log("View added movie in favorite list");
			sleep(5);
			
			driver.findElement(By.xpath("//a[@href='/browse']")).click();
			log("Nav back with Home tab");
			sleep(3);
			
			//add favorite movie from movie list item
			JavascriptExecutor js = (JavascriptExecutor) driver;
			js.executeScript("window.scrollBy(0,250)", "");
			sleep(3);
			
			List<WebElement> movieList = driver.findElements(By.className("swiper-slide"));
			Actions action = new Actions(driver);
			action.moveToElement(movieList.get(0)).perform();
			sleep(3);
			
			List<WebElement> playIconList = driver.findElements(By.className("icon--favourite"));
			playIconList.get(0).click();
			log("Add favorite movie from movie list item");
			sleep(3);
			
			driver.findElement(By.xpath("//a[@href='/mylist']")).click();
			log("View added movie in favorite list");
			sleep(5);

			driver.findElement(By.xpath("//a[@href='/browse']")).click();
			log("Nav back with Home tab");
			sleep(3);
			
			//add favorite movie from movie list item info
			js.executeScript("window.scrollBy(0,250)", "");
			sleep(3);
			
			movieList = driver.findElements(By.className("swiper-slide"));
			action = new Actions(driver);
			action.moveToElement(movieList.get(1)).perform();
			sleep(3);
			
			List<WebElement> infoIconList = driver.findElements(By.className("icon--toggleModal"));
			infoIconList.get(1).click();
			log("Add favorite movie from movie list item info");
			sleep(3);
			
			driver.findElement(By.xpath("//button[@class='Modal__image--button-circular']")).click();
			log("Add favorite movie from banner info");
			sleep(3);
			
			driver.findElement(By.xpath("//button[@class='Modal__closebtn']")).click();
			log("Closing banner info");
			sleep(3);
			
			driver.findElement(By.xpath("//a[@href='/mylist']")).click();
			log("View added movie in favorite list");
			sleep(3);
			
			//remove movie from favorite list
			List<WebElement> favMovieList = driver.findElements(By.className("Poster"));
			action = new Actions(driver);
			action.moveToElement(favMovieList.get(favMovieList.size() - 1)).perform();
			sleep(3);
			
			infoIconList = driver.findElements(By.className("icon--toggleModal"));
			infoIconList.get(infoIconList.size() - 1).click();
			sleep(3);
			
			driver.findElement(By.xpath("//button[@class='Modal__image--button-circular']")).click();
			log("Removed last favorite movie from list form item info");
			sleep(3);
			
			favMovieList = driver.findElements(By.className("Poster"));
			action = new Actions(driver);
			action.moveToElement(favMovieList.get(favMovieList.size() - 1)).perform();
			sleep(3);
			
			List<WebElement> removeIconList = driver.findElements(By.className("icon--favourite"));
			removeIconList.get(removeIconList.size() - 1).click();
			log("Removed last favorite movie from list from item");
			sleep(5);
			
			log("Navigation tests succeeded");
		} catch (Exception e) {
			log("Navigation tests failed");
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
