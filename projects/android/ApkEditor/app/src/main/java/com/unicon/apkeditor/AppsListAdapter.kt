package com.unicon.apkeditor

import android.content.Context
import android.content.pm.ApplicationInfo
import android.content.pm.ResolveInfo
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.ImageView
import android.widget.TextView

class AppsListAdapter(private val context: Context,
                      private val dataList: List<ApplicationInfo>) : BaseAdapter() {

    private val inflater: LayoutInflater = this.context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
    override fun getCount(): Int { return dataList.size }
    override fun getItem(position: Int): Int { return position }
    override fun getItemId(position: Int): Long { return position.toLong() }

    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        var dataitem = dataList[position]

        val rowView = inflater.inflate(R.layout.item_app, parent, false)
        rowView.findViewById<TextView>(R.id.appName).text = dataitem.loadLabel(context.packageManager)
        rowView.findViewById<TextView>(R.id.appPackage).text = dataitem.packageName
        rowView.findViewById<ImageView>(R.id.appImage).setImageDrawable(dataitem.loadIcon(context.packageManager))

        rowView.tag = position
        return rowView
    }
}