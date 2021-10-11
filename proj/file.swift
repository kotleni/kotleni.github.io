import Foundation

// класс для чтения файлов (В папке /home/$USER/Documents/)
class File {
  var path: String

  init(path: String) {
    self.path = path
  }

  /* прочитать файл */
  func read() -> String {
    var string = ""

    if let dir = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first {
      let fileURL = URL(string: self.path)
      do {
        string = try String(contentsOf: fileURL, encoding: .utf8)
      } catch let error { print("Error: \(error)") }
    }

    return string
  }
}
