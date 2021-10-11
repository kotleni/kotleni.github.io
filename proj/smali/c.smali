.class public LMain;
.super Ljava/lang/Object;
.source "Main.smali"

.method public static main([Ljava/lang/String;)V
    .registers 5

    new-instance v0, LEasySmali;
    invoke-direct {v0}, LEasySmali;-><init>()V

    invoke-virtual {v0}, LEasySmali;->readLine()Ljava/lang/String;
    move-result v1

    const-string v2, "secret"
    invoke-virtual {v1, v2}, Ljava/lang/String;->indexOf(Ljava/lang/String;)I
    move-result v1

    const v4, 0x0
    if-eq v1, v4, :unlock
    return-void

    :unlock
    invoke-static {p0}, LMain;->unlockAll()V
    return-void
.end method

.method public static unlockAll()V
    .registers 2

    new-instance v0, LEasySmali;
    invoke-direct {v0}, LEasySmali;-><init>()V

    const-string v1, "Done, you unlocked all!"
    invoke-virtual {v0, v1}, LEasySmali;->outln(Ljava/lang/String;)V

    return-void
.end method
