package com.jarontai.android.memories.model;

import java.util.Date;
import java.util.UUID;

public class Memo {
	
	private UUID id;
	private String title;
	private Date date;
	private boolean star; // star memo have higher rank
	
	public Memo() {
		id = UUID.randomUUID();
		date = new Date();
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public UUID getId() {
		return id;
	}

	public boolean isStar() {
		return star;
	}

	public void setStar(boolean star) {
		this.star = star;
	}

	public Date getDate() {
		return date;
	}
		
}
