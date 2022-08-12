//
//  String.swift
//  UkraineData
//
//  Created by Victor Varenik on 16.06.2022.
//

import Foundation

extension String {
    public var localized: String {
        NSLocalizedString(self, bundle: Bundle(for: BundleClass.self), comment: "")
    }
}

private class BundleClass { }
