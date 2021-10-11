.class public LMain;
.super Ljava/lang/Object;
.source "Main.smali"

.method public static main([Ljava/lang/String;)V
    .registers 5

    # new-instance v0, LEasySmali;
    # invoke-direct {v0}, LEasySmali;-><init>()V

    # new JFrame()
    new-instance v0, Ljavax/swing/JFrame;
    invoke-direct {v0}, Ljavax/swing/JFrame;-><init>()V

    # frame.setVisible(true)
    const/4 v1, 0x1
    invoke-virtual {v0, v1}, Ljavax/swing/JFrame;->setVisible(Z)V

    # new Dimension()
    new-instance v1, Ljava/awt/Dimension;

    const v2, 0x258
    const v3, 0x190
    invoke-direct {v1, v2, v3}, Ljava/awt/Dimension;-><init>(II)V

    # frame.setSize()
    invoke-virtual {v0, v1}, Ljavax/swing/JFrame;->setSize(Ljava/awt/Dimension;)V

    return-void
.end method
