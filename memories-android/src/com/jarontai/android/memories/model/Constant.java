package com.jarontai.android.memories.model;

import java.text.SimpleDateFormat;
import java.util.Locale;

public final class Constant {
	public static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.CHINA);   	
	public static final String EXTRA_MEMO_ID = "memo_id";
	public static final int MEMO_REQUEST = 1;
}
