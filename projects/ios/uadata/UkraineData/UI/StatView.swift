//
//  StatView.swift
//  UkraineData
//
//  Created by Victor Varenik on 17.06.2022.
//

import SwiftUI

struct StatView: View {
    private let groundItems = [
        "people", "bbm", "tanks", "artilery", "rszv", "ppo", "auto"
    ]
    
    private let airItems = [
        "planes", "helicopters", "bpla"
    ]
    
    private let waterItems = [
        "ships"
    ]
    
    @State private var isLoading: Bool = true
    @State private var dataGroundDict: Dictionary<String, Data> = Dictionary()
    @State private var dataAirDict: Dictionary<String, Data> = Dictionary()
    @State private var dataWaterDict: Dictionary<String, Data> = Dictionary()
    
    var body: some View {
        ZStack {
            Form {
                Section(content: {
                    ForEach(dataGroundDict.keys.sorted(), id: \.self) { key in
                        Text("\(Text("item_\(key)".localized)): \(dataGroundDict[key]!.value)")
                            .contextMenu {
                                Button {
                                    openLink(url: dataGroundDict[key]!.refUrl)
                                } label: {
                                    Text("btn_ref".localized)
                                }
                                Button {
                                    openLink(url: dataGroundDict[key]!.url)
                                } label: {
                                    Text("btn_uadata")
                                }
                            }
                    }
                }, header: {
                    Text("type_ground".localized)
                })
                
                Section(content: {
                    ForEach(dataAirDict.keys.sorted(), id: \.self) { key in
                        Text("\(Text("item_\(key)".localized)): \(dataAirDict[key]!.value)")
                            .contextMenu {
                                Button {
                                    openLink(url: dataAirDict[key]!.refUrl)
                                } label: {
                                    Text("btn_ref".localized)
                                }
                                Button {
                                    openLink(url: dataAirDict[key]!.url)
                                } label: {
                                    Text("btn_uadata".localized)
                                }
                            }
                    }
                }, header: {
                    Text("type_air".localized)
                })
                
                Section(content: {
                    ForEach(dataWaterDict.keys.sorted(), id: \.self) { key in
                        Text("\(Text("item_\(key)".localized)): \(dataWaterDict[key]!.value)")
                            .contextMenu {
                                Button {
                                    openLink(url: dataAirDict[key]!.refUrl)
                                } label: {
                                    Text("btn_ref".localized)
                                }
                                Button {
                                    openLink(url: dataAirDict[key]!.url)
                                } label: {
                                    Text("btn_uadata".localized)
                                }
                            }
                    }
                }, header: {
                    Text("type_water".localized)
                })
            }
            .opacity(isLoading ? 0.0 : 1.0)
            .onAppear {
                loadData()
            }
            
            if isLoading {
                ProgressView()
            }
        }
    }
    
    private func openLink(url: String) {
        guard let url = URL(string: url) else { return }
        UIApplication.shared.open(url)
    }
    
    private func loadData() {
        var score = 0
        let needScore = (groundItems.count + airItems.count + waterItems.count) - 1
        
        groundItems.forEach { key in
            UaDataAPI.getData(file: key) { data in
                dataGroundDict[key] = data
                if score >= needScore {
                    isLoading = false
                }
                score += 1
            }
        }
        airItems.forEach { key in
            UaDataAPI.getData(file: key) { data in
                dataAirDict[key] = data
                if score >= needScore {
                    isLoading = false
                }
                score += 1
            }
        }
        waterItems.forEach { key in
            UaDataAPI.getData(file: key) { data in
                dataWaterDict[key] = data
                if score >= needScore {
                    isLoading = false
                }
                score += 1
            }
        }
    }
}

