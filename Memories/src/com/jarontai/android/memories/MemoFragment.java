package com.jarontai.android.memories;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;

public class MemoFragment extends Fragment {
	
	private Memo memo;
	private EditText memoTitle;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		memo = new Memo();
	}

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		View v = inflater.inflate(R.layout.fragment_memo, container, false);
		
		memoTitle = (EditText) v.findViewById(R.id.memoTitle);
		memoTitle.addTextChangedListener(new TextWatcher() {

			@Override
			public void afterTextChanged(Editable arg0) {				
			}

			@Override
			public void beforeTextChanged(CharSequence arg0, int arg1,
					int arg2, int arg3) {				
			}

			@Override
			public void onTextChanged(CharSequence c, int arg1, int arg2,
					int arg3) {
				memo.setTitle(c.toString());				
			}
			
		});
		return v;
	}
	
	
}
