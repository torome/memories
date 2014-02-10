package com.jarontai.android.memories.fragment;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Locale;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.ListFragment;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.CheckBox;
import android.widget.ListView;
import android.widget.TextView;

import com.jarontai.android.memories.R;
import com.jarontai.android.memories.activity.MemoActivity;
import com.jarontai.android.memories.model.Constant;
import com.jarontai.android.memories.model.Memo;
import com.jarontai.android.memories.model.MemoBox;

public class MemoListFragment extends ListFragment {
	private ArrayList<Memo> memos;
	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.CHINA);   	
		
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		getActivity().setTitle(R.string.memos_title);
		memos = MemoBox.get(getActivity()).getMemos();
		
		MemoAdapter adapter = new MemoAdapter(memos);
		setListAdapter(adapter);
	}

	@Override
	public void onListItemClick(ListView l, View v, int position, long id) {
		Memo m = ((MemoAdapter) getListAdapter()).getItem(position);
		
		// When memo item clicked, start intent for memo details
		Log.d(MemoListFragment.class.getName(), "memo " + m.getId() + " clicked!");
		Intent intent = new Intent(getActivity(), MemoActivity.class);
		intent.putExtra(Constant.EXTRA_MEMO_ID, m.getId());
		startActivity(intent);
	}


	private class MemoAdapter extends ArrayAdapter<Memo> {

		public MemoAdapter(ArrayList<Memo> memos) {
			super(getActivity(), 0, memos);
		}

		@Override
		public View getView(int position, View convertView, ViewGroup parent) {
			if (convertView == null) {
				convertView = getActivity().getLayoutInflater()
						.inflate(R.layout.list_item_memo, null);
			}
			
			Memo m = getItem(position);
			// fill memo item content
			TextView title = (TextView) convertView.findViewById(R.id.memo_list_item_titleTextView);
			title.setText(m.getTitle());
			TextView date = (TextView) convertView.findViewById(R.id.memo_list_item_dateTextView);
			date.setText(sdf.format(m.getDate()));
			CheckBox starCheckBox = (CheckBox) convertView.findViewById(R.id.memo_list_item_starCheckBox);
			starCheckBox.setChecked(m.isStar());
			
			return convertView;
		}
		
		
	}
}
