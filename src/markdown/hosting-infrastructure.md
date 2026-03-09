# My hosting infrastructure
It's early 2026, and right now for non-production purposes - I have two servers: a VPS from OVHCloud and a home lab with a single HP EliteDesk.
The home lab is mostly shut down because of electricity blackouts in Ukraine, but **I have big plans for it once things stabilize**.

## Main VPS (fra2.kotle.uk)
Located in Frankfurt, Germany.
It's hosted on a machine with six 2.40GHz cores and 12 GB of RAM, running Debian.
This is my main server right now — all my Docker containers live here.

## Homelab (home.kotle.uk)
Located in Ukraine.
In the home lab right now, I have only an HP EliteDesk 705 G4 65W with:
- AMD Ryzen 5 PRO 2400G (3.6GHz base, up to ~3.9GHz boost, 4 cores / 8 threads)
- 8 GB RAM
- 64GB NVME SSD & 2 TB HDD

All running Debian.
I used to host media servers (like Plex/Jellyfin), game servers, FTP shares, and various Docker containers here. **It was my everything server back then!**
Right now, I rarely boot it up due to the power situation.

![HP EliteDesk](/elitedesk-1.jpg)

All networking runs through a TP-Link Archer C64 router connected to the fiber optic modem, and everything is powered through a DC UPS (12V) to give me a bit of buffer during short outages.

## Cloudflare
Most of my websites are hosted on Cloudflare Pages now, but I'm still migrating the last bits from GitHub Pages.
It's fast, free for my use case, and handles HTTPS/CDN automatically — perfect for static stuff.