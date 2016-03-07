package ui.twitter;

import org.auraframework.system.Annotations.Controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.sql.PreparedStatement;
import java.util.*;

import org.auraframework.system.Annotations.AuraEnabled;
import org.auraframework.system.Annotations.Key;

@Controller
public class HomepageController {

	static DatabasePoolService connectionPool;

	// @AuraEnabled
	// public String initialize() {
	// 	connectionPool = new DatabasePoolService();

	// 	return "Apex initialization complete.";
	// }
	
    @AuraEnabled
    public static String getAppName(@Key("appKey") String importantInfo) {
    	String retVal = "";
    	try {
			Class.forName("org.h2.Driver");
			//Connection conn = DriverManager.getConnection("jdbc:h2:~/test", "sa", ""); // db name, username, pw
			Connection conn = connectionPool.getConnection();
			retVal = conn.getCatalog();
            conn.close();
    	} catch (Exception e) {
    		throw new NullPointerException(e.getCause().getMessage());
    	}
    	return retVal;
    }

	@AuraEnabled
	public Tweet getTweet() throws Exception {
		Class.forName("org.h2.Driver");
		//Connection conn = connectionPool.getConnection();
		Connection conn = DriverManager.getConnection("jdbc:h2:~/test", "sa", ""); // db name, username, pw
		//boolean dropResult = conn.prepareStatement("DROP TABLE IF EXISTS tweetTable").execute();
		//boolean createResult = conn.prepareStatement("CREATE TABLE tweetTable (USERID INT PRIMARY KEY, NAME VARCHAR(255), MESSAGE VARCHAR(255), MESSAGE VARCHAR(255), DATE TIMESTAMP)").execute();
		//boolean insertResult = conn.prepareStatement("INSERT INTO testTable VALUES (1, 'hello')").execute();
		ResultSet queryResult = conn.prepareStatement("SELECT NAME, userTable.USERID, IMGURL, MESSAGE, DATE FROM tweetTable JOIN userTable on tweetTable.USERID = userTable.USERID").executeQuery();

		Tweet tweet = null;
		if (queryResult.next()) {
			String userId = queryResult.getString("USERID");
			String name = queryResult.getString("NAME");
			String message = queryResult.getString("MESSAGE");
			String imgUrl = queryResult.getString("IMGURL");
			String date = queryResult.getString("DATE");

			tweet = new Tweet(userId, message, name, imgUrl, date); // message, name, imgurl, date
		}
		conn.close();

		return tweet;
	}

	// used for debugging to ensure latest tweet sent properly
	@AuraEnabled
	public Tweet getLastTweet() throws Exception {
		Class.forName("org.h2.Driver");
		Connection conn = DriverManager.getConnection("jdbc:h2:~/test", "sa", ""); // db name, username, pw
		ResultSet queryResult = conn.prepareStatement("SELECT NAME, userTable.USERID, IMGURL, MESSAGE, DATE FROM tweetTable JOIN userTable on tweetTable.USERID = userTable.USERID ORDER BY DATE DESC LIMIT 1;").executeQuery();

		Tweet tweet = null;
		if (queryResult.next()) {
			String userId = queryResult.getString("USERID");
			String name = queryResult.getString("NAME");
			String message = queryResult.getString("MESSAGE");
			String imgUrl = queryResult.getString("IMGURL");
			String date = queryResult.getString("DATE");

			tweet = new Tweet(userId, message, name, imgUrl, date); // message, name, imgurl, date
		} else {
			throw new NullPointerException("something went wrong trying to retrieve the latest tweet");
		}
		conn.close();

		return tweet;
	}

	@AuraEnabled
	public String sendTweet(@Key("message") String message, @Key("userId") int userId) throws Exception {
		String statement = "INSERT INTO tweetTable VALUES (?, ?, CURRENT_TIMESTAMP);";
		try {
			Class.forName("org.h2.Driver");
			Connection conn = DriverManager.getConnection("jdbc:h2:~/test", "sa", ""); // db name, username, pw
			PreparedStatement prep = conn.prepareStatement(statement);
			prep.setInt(1, userId);
			prep.setString(2, message);
			boolean queryResult = prep.execute();
			//ResultSet queryResult = conn.prepareStatement("SELECT NAME, userTable.USERID, IMGURL, MESSAGE, DATE FROM tweetTable JOIN userTable on tweetTable.USERID = userTable.USERID").executeQuery();
			conn.close();
		} catch (Exception e) {
			throw new NullPointerException(e.getMessage());
		}
		return "tweet stored successfully";
	}

	@AuraEnabled
	public ArrayList<Tweet> getTweetsByUser(@Key("targetUserId") int targetUserId) throws Exception{
		ArrayList<Tweet> allTweets = new ArrayList<Tweet>();

		Class.forName("org.h2.Driver");
		Connection conn = DriverManager.getConnection("jdbc:h2:~/test", "sa", "");
		//ResultSet queryResult = conn.prepareStatement("SELECT NAME, userTable.USERID, IMGURL, MESSAGE, DATE FROM tweetTable JOIN userTable on tweetTable.USERID = userTable.USERID WHERE userTable.USERID = ? ORDER BY DATE DESC;").setInt(1, targetUserId).executeQuery();
		PreparedStatement prep = conn.prepareStatement("SELECT NAME, userTable.USERID, IMGURL, MESSAGE, DATE FROM tweetTable JOIN userTable on tweetTable.USERID = userTable.USERID WHERE userTable.USERID = ? ORDER BY DATE DESC;");
		prep.setInt(1, targetUserId);
		ResultSet queryResult = prep.executeQuery();


		while (queryResult.next()) {
			String userId = queryResult.getString("USERID");
			String name = queryResult.getString("NAME");
			String message = queryResult.getString("MESSAGE");
			String imgUrl = queryResult.getString("IMGURL");
			String date = queryResult.getString("DATE");

			allTweets.add(new Tweet(userId, message, name, imgUrl, date)); // message, name, imgurl, date
		}	

		conn.close();
		return allTweets;
	}

	@AuraEnabled
	public ArrayList<Tweet> getFeedTweets(@Key("quantity") int quantity) throws Exception {
		ArrayList<Tweet> allTweets = new ArrayList<Tweet>();

		try {
			Class.forName("org.h2.Driver");
			//Connection conn = DriverManager.getConnection("jdbc:h2:~/test", "sa", "");
			Connection conn = DatabasePoolService.get().getConnection();
			PreparedStatement prep = conn.prepareStatement("SELECT NAME, userTable.USERID, IMGURL, MESSAGE, DATE FROM tweetTable JOIN userTable on tweetTable.USERID = userTable.USERID ORDER BY DATE DESC LIMIT ?;");
			prep.setInt(1, quantity);
			ResultSet queryResult = prep.executeQuery();

			while (queryResult.next()) {
				String userId = queryResult.getString("USERID");
				String name = queryResult.getString("NAME");
				String message = queryResult.getString("MESSAGE");
				String imgUrl = queryResult.getString("IMGURL");
				String date = queryResult.getString("DATE");

				allTweets.add(new Tweet(userId, message, name, imgUrl, date)); // message, name, imgurl, date
			}	
			conn.close();
		} catch (Exception e) {
			throw new NullPointerException(e.getMessage());
		}
		return allTweets;
	}

	@AuraEnabled
	public UserProfile getUserInfo(@Key("desiredUserInfo") int desiredUserInfo) {
		UserProfile profile = null;
		
		try {
			Class.forName("org.h2.Driver");
			Connection conn = DriverManager.getConnection("jdbc:h2:~/test", "sa", "");
			PreparedStatement prep = conn.prepareStatement("SELECT * FROM userTable WHERE USERID = ?;");
			prep.setInt(1, desiredUserInfo);
			ResultSet queryResult = prep.executeQuery();

			if (queryResult.next()) {
				String userId = queryResult.getString("USERID");
				String name = queryResult.getString("NAME");
				// String message = queryResult.getString("MESSAGE");
				String imgUrl = queryResult.getString("IMGURL");
				String summary = queryResult.getString("SUMMARY");
				// String date = queryResult.getString("DATE");
				profile = new UserProfile(userId, name, imgUrl, summary);

				// allTweets.add(new Tweet(userId, message, name, imgUrl, date)); // message, name, imgurl, date
			}	
			conn.close();
		} catch (Exception e) {
			throw new NullPointerException(e.getMessage());
		}
		return profile;
	}

}
