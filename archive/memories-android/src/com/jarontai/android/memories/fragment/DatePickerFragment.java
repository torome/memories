package com.jarontai.android.memories.fragment;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.AlertDialog.Builder;
import android.app.Dialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.view.View;
import android.widget.DatePicker;
import android.widget.DatePicker.OnDateChangedListener;

import com.jarontai.android.memories.R;
import com.jarontai.android.memories.model.Constant;

public class DatePickerFragment extends DialogFragment {
	
	private Date date;
	
	public static DatePickerFragment newInstance(Date date) {
		Bundle args = new Bundle();
		args.putSerializable(Constant.EXTRA_DATE, date);
		
		DatePickerFragment fragment = new DatePickerFragment();
		fragment.setArguments(args);
		return fragment;
	}
	
	
	@Override
	public Dialog onCreateDialog(Bundle savedInstanceState) {
		date = (Date) getArguments().getSerializable(Constant.EXTRA_DATE);
		
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int year = cal.get(Calendar.YEAR);
		int month = cal.get(Calendar.MONTH);
		int day = cal.get(Calendar.DAY_OF_MONTH);
		
		View view = getActivity().getLayoutInflater().inflate(R.layout.fragment_datepicker, null);	
		DatePicker picker = (DatePicker) view.findViewById(R.id.dialog_datePicker);
		picker.init(year, month, day, new OnDateChangedListener() {
			
			@Override
			public void onDateChanged(DatePicker arg0, int year, int month, int day) {
				date = new GregorianCalendar(year, month, day).getTime();
				getArguments().putSerializable(Constant.EXTRA_DATE, date);
			}
		});
		
		
		Builder dialog = new AlertDialog.Builder(getActivity());
		dialog.setView(view);
		dialog.setTitle(R.string.date_picker_title);
		dialog.setPositiveButton(android.R.string.ok, new DialogInterface.OnClickListener() {
			
			@Override
			public void onClick(DialogInterface dialog, int which) {
				if (getTargetFragment() == null) {
					return;
				}
				
				Intent i = new Intent();
				i.putExtra(Constant.EXTRA_DATE, date);
				getTargetFragment().onActivityResult(getTargetRequestCode(), Activity.RESULT_OK, i);
			}
		});
		return dialog.create();
	}
	
}
