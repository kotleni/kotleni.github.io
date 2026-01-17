# Why I abandoned the idea of using Asahi Linux.

I am a Linux guy. I've used it on my VPS and home lab for years. On my desktop computer, I run Arch Linux exclusively, and I fully enjoy it for playing games, coding, and everything else. Just for fun, I even have two Android phones running Ubuntu Touch and postmarketOS.

But on my Macbook Air M1 (which I use often due to power outages here in Ukraine), I have macOS. Most of the time it works for me, but sometimes... I just can't do the things I want. I also hate the keyboard shortcuts in the IDEs and browsers that I am forced to use.

This often triggers me to think about installing Linux on my laptop. But unfortunately, the only project attempting to bring full-featured Linux to Apple Silicon (M-series) CPUs - Asahi Linux is progressing really slowly. Especially with the recent news, where many talented developers have left the project.

Before writing this blog post, I decided to install Asahi again to see what has changed compared to its state in late 2024.

**Nothing for me!** Many of the recent upgrades focus on gaming and Steam. Gaming? Are you kidding me? Most Asahi users are praying to be able to write code on it, not play games via slow x86_64 CPU emulation.

## What works well?

**1. Rendering games**
Yes, it handles 3D rendering reasonably well. But for this performance level, you'd need at least a PRO version with a lot of RAM.

**2. Microphone, charging, keyboard**
Works just fine. The keyboard backlight configuration is also supported.

## What is at least trying to work?

**1. Rendering UI**
A lot of stutter. Even the Christmas snowflakes on my winter-themed website decorations are laggy.

**2. Smooth scrolling**
Because of the stutter, you can't just scroll through your browser comfortably.

**3. Overall power efficiency**
Most of the time it works well, but you need to reboot often to maintain it.

**4. Sound**
The sound from the internal speakers is terrible, especially when you raise the volume.

**5. Camera**
The camera doesn't work in most native applications, though it works okay in the browser.

**6. A lot of other stuff...**
Swap performance is bad, SELinux is buggy, and there are features you will simply have to disable.

## What does not work?

**1. HDMI/DisplayPort over Type-C hub**
I really would like to use a second monitor, but I can't.

**2. A lot of software**
Some apps just don't work. Some fail because of the 16k memory page size, and others just have no ARM port.

**3. Sleep mode**
Even with no apps running and the lid closed, the battery drains while sleeping.

## Conclusion

For now, I accept my fate that **I will use macOS.**

After all, compared to Windows, it really isn't so bad. It is UNIX-based, so my workflow feels familiar, and most CLI tools and compilers are easily available via Homebrew. The hardware is incredible, and in a time of power outages, I need efficiency more than using Linux on everything :3
