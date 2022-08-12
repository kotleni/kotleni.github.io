//
//  AboutView.swift
//  UkraineData
//
//  Created by Victor Varenik on 17.06.2022.
//

import SwiftUI

struct AboutView: View {
    var body: some View {
        VStack {
            Form {
                Section {
                    Button {
                        openLink(url: "https://github.com/kotleni/uadata-ios")
                    } label: {
                        Text("link_github".localized)
                    }
                    .foregroundColor(Color("LinkColor"))

                    Button {
                        openLink(url: "https://uadata.net/api")
                    } label: {
                        Text("link_uadata".localized)
                    }
                    .foregroundColor(Color("LinkColor"))
                    
                    Button {
                        openLink(url: "https://uk.wikipedia.org/wiki/%D0%A0%D0%BE%D1%81%D1%96%D0%B9%D1%81%D1%8C%D0%BA%D0%B5_%D0%B2%D1%82%D0%BE%D1%80%D0%B3%D0%BD%D0%B5%D0%BD%D0%BD%D1%8F_%D0%B2_%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%83_%282022%28")
                    } label: {
                        Text("link_wiki".localized)
                    }
                    .foregroundColor(Color("LinkColor"))

                } header: {
                    Text("header_links")
                }
                
                Section {
                    Text("about_version")
                        .foregroundColor(Color("TipColor"))
                    Text("about_developer")
                        .foregroundColor(Color("TipColor"))
                } header: {
                    Text("header_desc")
                }
            }
        }
    }
    
    private func openLink(url: String) {
        guard let url = URL(string: url) else { return }
        UIApplication.shared.open(url)
    }
}
