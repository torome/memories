package com.jarontai.android.memories;

import java.util.UUID;

public class Memo {
	
	private UUID id;
	private String title;
	
	public Memo() {
		id = UUID.randomUUID();
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
	
}
