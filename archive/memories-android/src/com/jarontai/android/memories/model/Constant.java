package com.jarontai.android.memories.model;

import java.text.SimpleDateFormat;
import java.util.Locale;

public final class Constant {
	public static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.CHINA);   	
	public static final String EXTRA_MEMO_ID = "memo_id";
	public static final String EXTRA_DATE = "date_picker";
	public static final int REQUEST_MEMO = 1;
	public static final int REQUEST_DATE = 2;
}
