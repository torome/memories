package com.jarontai.android.memories.activity;

import java.util.UUID;

import com.jarontai.android.memories.fragment.MemoFragment;
import com.jarontai.android.memories.model.Constant;

import android.support.v4.app.Fragment;

public class MemoActivity extends AbstractFragmentActivity {

	@Override
	protected Fragment createFragment() {
		UUID memoId = (UUID) getIntent().getSerializableExtra(Constant.EXTRA_MEMO_ID);		
		return MemoFragment.newInstance(memoId);
	}

}
