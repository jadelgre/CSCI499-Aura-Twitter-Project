package ui.twitter;

import java.io.IOException;
import java.io.Serializable;
import java.sql.Date;

import org.auraframework.util.json.Json;
import org.auraframework.util.json.JsonSerializable;

public class Tweet implements JsonSerializable {
	public String userId;
	public String message;
	public String name;
	public String imageUrl;
	public String date;
	
	public Tweet(String userId, String message, String name, String imageUrl, String date) {
		this.userId = userId;
		this.message = message;
		this.name = name;
		this.imageUrl = imageUrl;
		this.date = date;
	}

	@Override
	public void serialize(Json arg0) throws IOException {
		arg0.writeMapBegin();
		arg0.writeMapEntry("userId", userId);
		arg0.writeMapEntry("name", name);
		arg0.writeMapEntry("message", message);
		arg0.writeMapEntry("imgUrl", imageUrl);
		arg0.writeMapEntry("date", date);
		arg0.writeMapEnd();
	}
	
	@Override
	public String toString() {
		return "userId=" + userId + ", name=" + name + ", message=" + message + ", imageUrl=" + imageUrl + ", date= " + date;
	}
}