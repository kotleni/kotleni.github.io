//
//  MapView.swift
//  UkraineData
//
//  Created by Victor Varenik on 17.06.2022.
//

import SwiftUI

struct MapView: View {
    var body: some View {
        WebView(url: "https://upload.wikimedia.org/wikipedia/commons/4/4f/2022_Russian_invasion_of_Ukraine.svg")
    }
    
    private func openLink(url: String) {
        guard let url = URL(string: url) else { return }
        UIApplication.shared.open(url)
    }
}
