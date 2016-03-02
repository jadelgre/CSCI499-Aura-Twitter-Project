package ui.twitter;

import java.io.IOException;
import java.io.Serializable;
import java.sql.Date;

import org.auraframework.util.json.Json;
import org.auraframework.util.json.JsonSerializable;

public class UserProfile implements JsonSerializable {
	public String userId;
	public String name;
	public String imageUrl;
	public String summary;
	
	public UserProfile(String userId, String name, String imageUrl, String summary) {
		this.userId = userId;
		this.name = name;
		this.imageUrl = imageUrl;
		this.summary = summary;
	}

	@Override
	public void serialize(Json arg0) throws IOException {
		arg0.writeMapBegin();
		arg0.writeMapEntry("userId", userId);
		arg0.writeMapEntry("name", name);
		arg0.writeMapEntry("imgUrl", imageUrl);
		arg0.writeMapEntry("summary", summary);
		arg0.writeMapEnd();
	}
	
	@Override
	public String toString() {
		return "userId=" + userId + ", name=" + name + ", imageUrl=" + imageUrl + ", summary= " + summary;
	}
}