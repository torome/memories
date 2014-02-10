package com.jarontai.android.memories.activity;

import com.jarontai.android.memories.fragment.MemoListFragment;

import android.support.v4.app.Fragment;

public class MemoListActivity extends AbstractFragmentActivity {

	@Override
	protected Fragment createFragment() {
		return new MemoListFragment();
	}

}
