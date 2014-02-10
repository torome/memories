package com.jarontai.android.memories.activity;

import com.jarontai.android.memories.fragment.MemoFragment;

import android.support.v4.app.Fragment;

public class MemoActivity extends AbstractFragmentActivity {

	@Override
	protected Fragment createFragment() {
		return new MemoFragment();
	}

}
