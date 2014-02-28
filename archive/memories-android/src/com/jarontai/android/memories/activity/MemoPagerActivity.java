package com.jarontai.android.memories.activity;

import java.util.ArrayList;
import java.util.UUID;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;
import android.support.v4.view.ViewPager;

import com.jarontai.android.memories.R;
import com.jarontai.android.memories.fragment.MemoFragment;
import com.jarontai.android.memories.model.Constant;
import com.jarontai.android.memories.model.Memo;
import com.jarontai.android.memories.model.MemoBox;

public class MemoPagerActivity extends FragmentActivity {
	private ViewPager viewPager;
	private ArrayList<Memo> memos;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		viewPager = new ViewPager(this);
		viewPager.setId(R.id.viewPager);
		setContentView(viewPager);
		
		memos = MemoBox.get(this).getMemos();
		FragmentManager fm = getSupportFragmentManager();
		viewPager.setAdapter(new FragmentStatePagerAdapter(fm) {
			
			@Override
			public int getCount() {
				return memos.size();
			}
			
			@Override
			public Fragment getItem(int pos) {
				Memo memo = memos.get(pos);
				return MemoFragment.newInstance(memo.getId());
			}
		});
	
		viewPager.setOnPageChangeListener(new ViewPager.OnPageChangeListener() {
			
			@Override
			public void onPageSelected(int pos) {
				Memo memo = memos.get(pos);
				setTitle(memo.getTitle());
			}
			
			@Override
			public void onPageScrolled(int arg0, float arg1, int arg2) {				
			}
			
			@Override
			public void onPageScrollStateChanged(int arg0) {		
			}
		});
		
		UUID mId = (UUID) getIntent().getSerializableExtra(Constant.EXTRA_MEMO_ID);
		for (int i = 0; i < memos.size(); i++) {
			if (memos.get(i).getId().equals(mId)) {
				viewPager.setCurrentItem(i);
				break;
			}
		}
	}
		
}
