fun showUniconLogo() {
        val linear = LinearLayout(this)
        linear.gravity = Gravity.CENTER
        linear.setLayoutParams(ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))

        var textview = TextView(this)
        textview.text = "Unicon Studio"
        textview.textSize = 24f
        textview.setTextColor(Color.WHITE)
        textview.typeface = Typeface.SANS_SERIF

        linear.addView(textview)

        val dialog = Dialog(this, android.R.style.Theme_Black_NoTitleBar)
        dialog.setCancelable(false)
        dialog.setContentView(linear)

        dialog.show()

        thread {
            Thread.sleep(400)
            runOnUiThread {
                textview.animate()
                        .scaleX(2.5f)
                        .scaleY(2.5f)
                        .setDuration(1400)
                        .start();
            }
            Thread.sleep(500)
            runOnUiThread {
                textview.animate()
                        .scaleX(1f)
                        .scaleY(1f)
                        .setDuration(1000)
                        .start();
            }


        }
    }
