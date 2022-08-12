package main

import (
	"fmt"
)

func main() {
	fmt.Printf("[jvm]\n")

	vm := New("rgt/")
	//vm.ClassPath = append(vm.ClassPath, "build/")

	// native bindings
	vm.RegisterNative("java/io/PrintStream", "println", "(Ljava/lang/String;)V", func(args ...Value) Value {
		fmt.Printf("%s\n", args)
		return nil
	})
	vm.RegisterNative("java/lang/System", "currentTimeMillis", "()J", func(args ...Value) Value {
		return 0
	})

	vm.Call("Main", "main")
}
