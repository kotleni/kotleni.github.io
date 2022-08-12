import SwiftUI

struct ContentView: View {
    @State var selection: Int = 0
    
    var body: some View {
        TabView(selection: $selection) {
            StatView()
                .tag(0)
                .tabItem {
                    Label("tab_stat".localized, systemImage: "doc.plaintext")
                }
            MapView()
                .tag(1)
                .tabItem {
                    Label("tab_map".localized, systemImage: "map")
                }
            AboutView()
                .tag(2)
                .tabItem {
                    Label("tab_about".localized, systemImage: "info.circle")
                }
            
        }
        .navigationTitle(Text(selection == 0 ? "title_stat".localized : selection == 1 ? "title_map".localized : "title_about".localized))
    }

}
