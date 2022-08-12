package unicon.code.activity

import android.Manifest
import android.content.Context
import android.content.SharedPreferences
import android.content.pm.PackageManager
import android.graphics.Color
import android.net.Uri
import android.os.Bundle
import android.os.Environment
import android.provider.MediaStore
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.AppCompatImageView
import androidx.core.app.ActivityCompat
import androidx.core.view.GravityCompat
import androidx.drawerlayout.widget.DrawerLayout
import com.afollestad.materialdialogs.LayoutMode
import com.afollestad.materialdialogs.MaterialDialog
import com.afollestad.materialdialogs.bottomsheets.BottomSheet
import com.afollestad.materialdialogs.input.getInputField
import com.afollestad.materialdialogs.input.input
import com.afollestad.materialdialogs.list.listItems
import com.afollestad.materialdialogs.list.listItemsMultiChoice
import unicon.code.Global
import unicon.code.R
import unicon.code.dialog.SplashDialog
import unicon.code.getPath
import unicon.code.hideKeyboardFrom
import unicon.code.plugin.PluginsLoader
import unicon.code.widget.CodeEditor
import unicon.code.widget.FileManagerView
import java.io.File
import java.nio.charset.Charset
import kotlin.concurrent.thread


class MainActivity : AppCompatActivity() {
    private lateinit var code_editor: CodeEditor
    private lateinit var drawer_layout: DrawerLayout
    private lateinit var code_content: FrameLayout
    private lateinit var menu_btn: ImageView
    private lateinit var file_name: TextView
    private lateinit var more_btn: ImageView
    private lateinit var file_manger: FileManagerView
    private lateinit var mark_path: TextView
    private lateinit var btn_newfile: LinearLayout
    private lateinit var btn_newdir: LinearLayout
    private lateinit var btn_backdir: LinearLayout
    private lateinit var save_btn: AppCompatImageView

    private val REQUEST_CODE_PERMISSIONS = 1

    private var prefs: SharedPreferences? = null
    private var ploader: PluginsLoader? = null
    private lateinit var splash: SplashDialog

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_code)

        code_editor = findViewById(R.id.code_editor)
        drawer_layout = findViewById(R.id.drawer_layout)
        code_content = findViewById(R.id.code_content)
        menu_btn = findViewById(R.id.menu_btn)
        file_name = findViewById(R.id.file_name)
        more_btn = findViewById(R.id.more_btn)
        file_manger = findViewById(R.id.file_manger)
        mark_path = findViewById(R.id.mark_path)
        btn_newfile = findViewById(R.id.btn_newfile)
        btn_newdir = findViewById(R.id.btn_newdir)
        btn_backdir = findViewById(R.id.btn_backdir)
        save_btn = findViewById(R.id.save_btn)

        prefs = getSharedPreferences("main", Context.MODE_PRIVATE)

        // показать SplashScreen
        splash = SplashDialog(this)

        splash.show()
        splash.animate()

        // проверка разрешений
        if(ActivityCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED) {
            startApp()
        } else {
            ActivityCompat.requestPermissions(
                this,
                arrayOf(
                    Manifest.permission.READ_EXTERNAL_STORAGE,
                    Manifest.permission.WRITE_EXTERNAL_STORAGE
                ),
                REQUEST_CODE_PERMISSIONS
            )

        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        when(requestCode) {
            REQUEST_CODE_PERMISSIONS -> { // если выданы права
                startApp()
            }
        }

        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    }

    override fun onBackPressed() {
        // если меню закрыто, то просто выключать приложение
        if(!drawer_layout.isDrawerOpen(GravityCompat.START)) super.onBackPressed()

        if(file_manger.getCurrentDir() != File(Environment.getExternalStorageDirectory().path)) { // если это внутреняя память
            file_manger.prevDir()
        } else { // если другая папка
            // если сохранено, то выходим из приложения
            if(code_editor.isSaved()) super.onBackPressed()
            else { // если нет

                // показать диалог с предруждением
                showSaveWarningDialog {
                    when(it) {
                        true -> { // согласился
                            code_editor.saveFile()
                            super.onBackPressed()
                        }

                        false -> { // не согласился
                            super.onBackPressed()
                        }
                    }
                }
            }
        }
    }

    /* продолжение onCreate */
    private fun startApp() {
        thread { startAppBackground() }
    }

    /* продолжение onCreate в фоне */
    private fun startAppBackground() {
        // генерируем путь к папке приложения в Androd/data
        Global.appDir = Environment.getExternalStorageDirectory().path + "/Android/data/" + applicationInfo.packageName + "/files/"
        Global.charset = Charset.defaultCharset()

        runOnUiThread { splash.setProgressMessage("Настройка") }

        // настраиваем файлы приложения
        val pdir = File(Global.appDir + "/plugins/")
        if(!pdir.exists()) pdir.mkdirs()

        val tmpFile = File(Global.appDir + "/file.tmp")
        if(tmpFile.exists()) tmpFile.delete()

        // получение плагинов с ассетов
        assets.list("plugins")!!.forEach {
            val stream = assets.open("plugins/$it")
            val oldstr = stream.readBytes().toString(Global.charset!!)

            val newfile = File(Global.appDir + "plugins/" + it)
            val newstr = if(newfile.exists()) newfile.readText(Global.charset!!) else ""

            // если плагин не совпадает, или он отсутстсует
            if(oldstr != newstr) {
                // удаляем файл есть он есть
                if(newfile.exists()) newfile.delete()

                // копируем новый файл
                // stream.copyTo(newfile.outputStream())
                newfile.writeText(oldstr, Global.charset!!)
            }
        }

        runOnUiThread { splash.setProgressMessage("Загрузка плагинов") }

        ploader = PluginsLoader(this)
        ploader!!.setOnPluginLoadedListener {
            if(!it.isLoaded) runOnUiThread {
                splash.setProgressMessage(it.error)
            }
        }
        ploader!!.loadPluginsFromDir(pdir)

        Thread.sleep(1000)
        runOnUiThread { startApp2() }
    }

    /* продолжение onCreate 2 */
    private fun startApp2() {
        setupFileManager()
        setupDrawer()
        setupFileManagerButtons()
        setupCodeEditor()
        setupBar()
        loadPrefs()

        splash.dismiss()

        val intent = intent
        val u = intent.data
        if(u != null) {
            val file = File(getPath(u)!!)

            code_editor.openFile(file)
        }
    }

    private fun showPluginsManager() {
        val myItems = ArrayList<String>()
        ploader!!.getPlugins().forEach { myItems.add(it.name) }

        MaterialDialog(this, BottomSheet(LayoutMode.WRAP_CONTENT)).show {
            title(-1, "Загруженые плагины")
            message(-1, "Все плагины находятся в папке ${Global.appDir}plugins/" )
            listItems(items = myItems)
        }
    }

    private fun loadPrefs() {
        if(prefs!!.getBoolean("devmode", false))
            Global.isDev = true
    }

    private fun setupBar() {
        menu_btn.setOnClickListener {
            drawer_layout.openDrawer(GravityCompat.START)
        }

        save_btn.setOnClickListener {
            code_editor.saveFile()

            Toast.makeText(applicationContext, "Файл сохранен!", Toast.LENGTH_LONG).show()
        }

        val popup = PopupMenu(applicationContext, more_btn)
        val menu = popup.menu

        menu.add("Плагины")
        menu.add("Выйти")

        popup.setOnMenuItemClickListener {
            if(it.title == "Выйти") finishAffinity()
            if(it.title == "Плагины") showPluginsManager()

            true
        }

        more_btn.setOnClickListener { popup.show() }
        more_btn.setOnLongClickListener {
            val edt = prefs!!.edit()
            edt.putBoolean("devmode", true)
            edt.apply()

            finishAffinity()

            true
        }
    }

    /* настроить редактор кода */
    private fun setupCodeEditor() {
        code_editor.setOnOpenFileListener { file ->
            file_name.text = if(file.name == "file.tmp") "" else file.name

            var isOpen = false
            ploader!!.getPlugins().forEach { plugin ->
                isOpen = plugin.openFile(file)

                if(isOpen) { // если плагин может открыть этот файл
                    code_editor.updatePlugin(plugin)

                    return@setOnOpenFileListener
                }
            }

            if(!isOpen) {
                code_editor.updatePlugin(null)
            }
        }
        code_editor.setOnSaveFileListener {
            file_manger.reopen()
        }

        code_editor.openFile(File(Global.appDir + "file.tmp"))
    }

    /* настройка кнопок в менеджере файлов */
    private fun setupFileManagerButtons() {
        val adapter = file_manger.getFileManagerAdapter()

        btn_newfile.setOnClickListener {
            MaterialDialog(this, BottomSheet(LayoutMode.WRAP_CONTENT)).show {
                title(-1, "Создать новый файл")
                input(hint = "Введите имя файла")

                positiveButton(-1, "Создать")
                positiveButton {
                    File(file_manger.getCurrentDir().path + "/" + getInputField().text)
                        .createNewFile()

                    file_manger.reopen()
                }

                negativeButton(-1, "Отмена")
            }
        }

        btn_newdir.setOnClickListener {
            MaterialDialog(this, BottomSheet(LayoutMode.WRAP_CONTENT)).show {
                title(-1, "Создать новую папку")
                input(hint = "Введите имя папки")

                positiveButton(-1, "Создать")
                positiveButton {
                    File(file_manger.getCurrentDir().path + "/" + getInputField().text)
                        .mkdir()

                    file_manger.reopen()
                }

                negativeButton(-1, "Отмена")
            }
        }

        btn_backdir.setOnClickListener {
            if(adapter.currentDir != File(Environment.getExternalStorageDirectory().path)) {
                file_manger.prevDir()
            }
        }
    }

    /* настройка менеджера файлов */
    private fun setupFileManager() {
        file_manger.setOnOpenFileListener { file ->
            drawer_layout.closeDrawer(GravityCompat.START)

            if(code_editor.getCurrentFile() != null)
                if(file.path == code_editor.getCurrentFile()!!.path)
                    return@setOnOpenFileListener

            if(code_editor.isSaved()) {
                code_editor.openFile(file)
            } else {
                showSaveWarningDialog {
                    if(it) code_editor.saveFile()

                    code_editor.openFile(file)
                }
            }
        }

        file_manger.setOnChangeDirListener {
            mark_path.text = it.path
        }

        file_manger.openDir(File(Environment.getExternalStorageDirectory().path))
    }

    /* настройка меню */
    private fun setupDrawer() {
        drawer_layout.setScrimColor(Color.TRANSPARENT)
        drawer_layout.drawerElevation = 0f
        drawer_layout.addDrawerListener(object: DrawerLayout.DrawerListener {
            override fun onDrawerStateChanged(newState: Int) {

            }

            override fun onDrawerSlide(drawerView: View, slideOffset: Float) {
                code_content.translationX = (drawerView.width * slideOffset)
            }

            override fun onDrawerClosed(drawerView: View) {

            }

            override fun onDrawerOpened(drawerView: View) {
                hideKeyboardFrom(drawerView)
            }

        })
    }

    private fun showSaveWarningDialog(lam: (isSave: Boolean) -> Unit) {
        MaterialDialog(this, BottomSheet(LayoutMode.WRAP_CONTENT)).show {
            title(-1, "Изменения не сохранены!")
            message(-1, "Вы хотите сохранить файл?")

            positiveButton(-1, "Сохранить")
            positiveButton {
                lam(true)
            }

            negativeButton(-1, "Не сохранять")
            negativeButton {
                lam(false)
            }
        }
    }
}