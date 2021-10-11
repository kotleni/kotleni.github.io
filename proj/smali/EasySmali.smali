.class public LEasySmali;
.super Ljava/lang/Object;
.source "EasySmali.smali"

# constructor
.method public constructor <init>()V
    .registers 1

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method

# read user input to string
.method public readLine()Ljava/lang/String;
    .registers 2

    sget-object v0, Ljava/lang/System;->in:Ljava/io/InputStream;

    new-instance v1, Ljava/util/Scanner;
    invoke-direct {v1, v0}, Ljava/util/Scanner;-><init>(Ljava/io/InputStream;)V

    invoke-virtual {v1}, Ljava/util/Scanner;->nextLine()Ljava/lang/String;
    move-result v0

    return v0
.end method

# print string to console with new line
.method public outln(Ljava/lang/String;)V
    .registers 2

    sget-object v0, Ljava/lang/System;->out:Ljava/io/PrintStream;
    invoke-virtual {v0, p1}, Ljava/io/PrintStream;->println(Ljava/lang/String;)V

    return-void
.end method

# print string to console
.method public out(Ljava/lang/String;)V
    .registers 2

    sget-object v0, Ljava/lang/System;->out:Ljava/io/PrintStream;
    invoke-virtual {v0, p1}, Ljava/io/PrintStream;->print(Ljava/lang/String;)V

    return-void
.end method
