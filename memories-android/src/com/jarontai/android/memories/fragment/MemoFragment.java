package com.jarontai.android.memories.fragment;

import java.util.UUID;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.CompoundButton.OnCheckedChangeListener;
import android.widget.EditText;

import com.jarontai.android.memories.R;
import com.jarontai.android.memories.model.Constant;
import com.jarontai.android.memories.model.Memo;
import com.jarontai.android.memories.model.MemoBox;

public class MemoFragment extends Fragment {
	
	private Memo memo;
	private EditText memoTitle;
	private Button dateButton;
	private CheckBox starCheckBox;

	public static MemoFragment newInstance(UUID memoId) {
		Bundle args = new Bundle();
		args.putSerializable(Constant.EXTRA_MEMO_ID, memoId);
		
		MemoFragment fragment = new MemoFragment();
		fragment.setArguments(args);		
		return fragment;
	}
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		UUID mId = (UUID) getArguments().getSerializable(Constant.EXTRA_MEMO_ID);
		memo = MemoBox.get(getActivity()).getMemo(mId);
	}

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		View v = inflater.inflate(R.layout.fragment_memo, container, false);
		
		memoTitle = (EditText) v.findViewById(R.id.memoTitle);
		memoTitle.setText(memo.getTitle());
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
		
		dateButton = (Button) v.findViewById(R.id.memoDate);
		dateButton.setText(Constant.sdf.format(memo.getDate()));
		dateButton.setEnabled(false);
		
		starCheckBox = (CheckBox) v.findViewById(R.id.starSelected);
		starCheckBox.setChecked(memo.isStar());
		starCheckBox.setOnCheckedChangeListener(new OnCheckedChangeListener() {			
			@Override
			public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
				memo.setStar(isChecked);				
			}
		});
		
		return v;
	}
	
	
}
