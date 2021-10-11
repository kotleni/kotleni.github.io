import java.net.ServerSocket
import kotlin.concurrent.thread

class UUCServer(port: Int) {
    lateinit var socket: ServerSocket

    var clients = ArrayList<Client>()

    init {
        socket = ServerSocket(port)
    }

    fun start() {
        println("Сервер запущен по адресу " + socket.inetAddress.canonicalHostName)

        while (true) {
            var client = socket.accept() // ожидаение нового клиента

            // запустить клиента в отдельном потоке
            thread {
                var cl = Client(client, this)
                clients.add(cl) // добавить в список

                cl.start() // запустить
            }
        }
    }
}