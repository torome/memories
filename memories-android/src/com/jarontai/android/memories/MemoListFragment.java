package com.jarontai.android.memories;

import java.util.ArrayList;

import android.os.Bundle;
import android.support.v4.app.ListFragment;

import com.jarontai.android.memories.model.Memo;
import com.jarontai.android.memories.model.MemoBox;

public class MemoListFragment extends ListFragment {
	private ArrayList<Memo> memos;
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		getActivity().setTitle(R.string.memos_title);
		memos = MemoBox.get(getActivity()).getMemos();
	}

}
