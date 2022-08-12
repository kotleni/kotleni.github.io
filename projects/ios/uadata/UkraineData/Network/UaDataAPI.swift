import Foundation

class UaDataAPI {
    static func getData(file: String, callback: @escaping (Data) -> ()) {
        let url = URL(string: "https://uadata.net/ukraine-russia-war-2022/\(file).json")!
        let session = URLSession.shared
        let request = URLRequest(url: url)
        
        let task = session.dataTask(with: request as URLRequest, completionHandler: { data, response, error in
            guard error == nil else {
                return
            }
            
            guard let data = data else {
                return
            }
            
            //print(url)
            //print(String(data: data, encoding: .utf8))

            do {
                if let json = try JSONSerialization.jsonObject(with: data, options: .mutableContainers) as? [String: Any] {
                    let _data = json["data"] as? [[String: Any]]
                    let _value = _data![0]["val"]! as! Int
                    let _url = json["url"]! as! String
                    let _ref = _data![0]["ref"]! as! String
                    
                    let data = Data(value: _value, url:_url, refUrl: _ref)
                    callback(data)
                }
            } catch let error {
                print(error.localizedDescription)
            }
        })

        task.resume()
    }
}
