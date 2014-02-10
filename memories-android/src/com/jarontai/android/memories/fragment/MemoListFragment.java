package com.jarontai.android.memories.fragment;

import java.util.ArrayList;

import android.os.Bundle;
import android.support.v4.app.ListFragment;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.jarontai.android.memories.R;
import com.jarontai.android.memories.model.Memo;
import com.jarontai.android.memories.model.MemoBox;

public class MemoListFragment extends ListFragment {
	private ArrayList<Memo> memos;
	private static final String TAG = "MemoListFragment";
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		getActivity().setTitle(R.string.memos_title);
		memos = MemoBox.get(getActivity()).getMemos();
		
		ArrayAdapter<Memo> adapter = new ArrayAdapter<Memo>(getActivity(), android.R.layout.simple_list_item_1, memos);
		setListAdapter(adapter);
	}

	@Override
	public void onListItemClick(ListView l, View v, int position, long id) {
		Memo m = (Memo) getListAdapter().getItem(position);
		Log.d(TAG, m.getTitle() + " was clicked!");
	}

	
}
