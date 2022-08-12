package unicon.code.plugin

import java.util.regex.Pattern

data class CodeRegex(var pattern: Pattern, var color: Int, var cutStart: Int, var cutEnd: Int) {
}