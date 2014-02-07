package com.jarontai.android.memories.model;

import java.util.ArrayList;
import java.util.UUID;


import android.content.Context;

public class MemoBox {
	private ArrayList<Memo> memos;
	private static MemoBox memoBox;
	private Context appContext;
	
	private MemoBox(Context context) {
		appContext = context;
		memos = new ArrayList<Memo>();
		for (int i = 0; i < 100; i++) {
			Memo m = new Memo();
			m.setTitle("Memo #" + i);
			m.setStar(i % 2 == 0);
			memos.add(m);
		}
	}
	
	public static MemoBox get(Context c) {
		if (memoBox == null) {
			memoBox = new MemoBox(c.getApplicationContext());
		}
		return memoBox;
	}

	public ArrayList<Memo> getMemos() {
		return memos;
	}

	public Memo getMemo(UUID id) {
		for (Memo m : memos) {
			if (m.getId().equals(id)) {
				return m;
			}
		}
		return null;
	}
}
