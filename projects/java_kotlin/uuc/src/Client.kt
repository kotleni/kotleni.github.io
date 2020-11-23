import java.io.OutputStream
import java.lang.Exception
import java.net.Socket
import java.nio.charset.Charset
import java.util.*

class Client(_client: Socket, _server: UUCServer) : Thread() {
    var client = _client
    var server = _server

    val reader: Scanner = Scanner(client.getInputStream()) // сканнер для чтения
    val writer: OutputStream = client.getOutputStream() // выходной стрим для отправки

    // обработка пользователя (в отдельном потоке)
    override fun run() {
        var m = getUsername() + " подключился!"

        println(m)
        for (cl in server.clients) {
            if (cl.client == this.client) continue

            cl.sendMessage(null, m)
        }

        // цикл получения сообщений
        while(true) {
            try {
                var txt = reader.nextLine() // прочитать линию у клиента

                for (cl in server.clients) {
                    if (cl.client == client) continue // пропустить если это тот же клиент
                    cl.sendMessage(this, txt)
                }
            } catch (e: Exception) { break } // связь потеряна
        }

        kick() // кикнуть клиента
    }

    /* получить ник клиента */
    fun getUsername() : String {
        return client.inetAddress.hostAddress.toString()
    }

    /* кикнуть клиента */
    fun kick() {
        this.server.clients.remove(this) // удалить из списка

        var m = getUsername() + " отключился!"

        println(m)
        for (cl in server.clients) {
            cl.sendMessage(null, m)
        }
    }

    /* отправить сообщение клиенту */
    fun sendMessage(from: Client?, message: String) {
        var m = ((if (from == null) "" else from!!.getUsername()) + " : " + message)

        println(m)
        writer.write((m + "\n").toByteArray(Charset.defaultCharset()))
    }
}