.class public LMain;
.super Ljava/lang/Object;
.source "Main.smali"

# virtual methods
.method public static main([Ljava/lang/String;)V
    .registers 5

    # print welcome message
    sget-object v0, Ljava/lang/System;->out:Ljava/io/PrintStream;
    const-string v1, "Enter your name: "
    invoke-virtual {v0, v1}, Ljava/io/PrintStream;->print(Ljava/lang/String;)V

    # read input
    sget-object v0, Ljava/lang/System;->in:Ljava/io/InputStream;

    new-instance v1, Ljava/util/Scanner;
    invoke-direct {v1, v0}, Ljava/util/Scanner;-><init>(Ljava/io/InputStream;)V

    invoke-virtual {v1}, Ljava/util/Scanner;->nextLine()Ljava/lang/String;
    move-result v0

    # print name
    sget-object v1, Ljava/lang/System;->out:Ljava/io/PrintStream;
    invoke-virtual {v1, v0}, Ljava/io/PrintStream;->println(Ljava/lang/String;)V

    return-void
.end method
