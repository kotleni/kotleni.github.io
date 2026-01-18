<script lang="ts">
    import GithubIcon from '@/lib/icons/GithubIcon.svelte';
    import GmailIcon from '@/lib/icons/GmailIcon.svelte';
    import LinkedInIcon from '@/lib/icons/LinkedInIcon.svelte';
    import TelegramIcon from '@/lib/icons/TelegramIcon.svelte';

    import DecimalAge from '@/lib/DecimalAge.svelte';
    import SocialIcon from '@/lib/SocialIcon.svelte';
    import StyledLink from '@/lib/StyledLink.svelte';
    import Badge from '@/lib/Badge.svelte';
    import JourneyCard from '@/lib/JourneyCard.svelte';
    import {getKyivTimeZoneInfo} from '@/lib/utils';

    import {
        aboutMe,
        myEmail,
        myUrls,
        skillsStack,
        skillsStackAdditional,
    } from '@/data/about';
    import {push} from 'svelte-spa-router';
    const timeInfo = getKyivTimeZoneInfo();

    const targetCount = 8;
    let counter = $state(0);
</script>

<div class="flex flex-col gap-6 mt-2 text-foreground/90">
    <section class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-bold tracking-tight">
                Viktor Varenik
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <p
                    class="text-sm opacity-60 cursor-pointer select-none"
                    onclick={() => {
                        counter += 1;
                        if (counter >= targetCount) {
                            console.log("Oh, that's was strange...");
                            void push('/nudes');
                        }
                    }}
                >
                    (kotleni)
                </p>
            </h1>
            <div class="flex gap-3">
                <SocialIcon
                    iconComponent={GmailIcon}
                    destinationUrl={'mailto:' + myEmail}
                    label="Gmail"
                />
                <SocialIcon
                    iconComponent={LinkedInIcon}
                    destinationUrl={myUrls.linkedin}
                    label="Linkedin"
                />
                <SocialIcon
                    iconComponent={TelegramIcon}
                    destinationUrl={myUrls.telegram}
                    label="Telegram"
                />
                <SocialIcon
                    iconComponent={GithubIcon}
                    destinationUrl={myUrls.github}
                    label="Github"
                />
            </div>
        </div>
        <p class="text-muted-foreground leading-relaxed">
            {aboutMe}
        </p>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section class="flex flex-col">
            <p class="font-semibold">verbose.</p>
            <div class="flex flex-col gap-2 text-sm mt-2">
                <div
                    class="flex justify-between items-center border-b border-border/50 pb-1"
                >
                    <span class="font-bold">Position</span>
                    <span class="text-muted-foreground text-right">
                        Full-stack Engineer
                    </span>
                </div>
                <div
                    class="flex justify-between items-center border-b border-border/50 pb-1"
                >
                    <span class="font-bold">Location</span>
                    <a
                        href="https://www.google.com/maps/place/Kharkiv"
                        target="_blank"
                        class="text-muted-foreground hover:underline underline-offset-4 decoration-dotted text-right"
                    >
                        Ukraine, Kharkiv
                    </a>
                </div>
                <div
                    class="flex justify-between items-center border-b border-border/50 pb-1"
                >
                    <span class="font-bold">Timezone</span>
                    <span
                        class="text-muted-foreground text-right"
                        title={timeInfo.season}
                    >
                        {timeInfo.utcOffset}
                    </span>
                </div>
                <div
                    class="flex justify-between items-center border-b border-border/50 pb-1"
                >
                    <span class="font-bold">Age</span>
                    <span
                        class="text-muted-foreground text-right flex flex-row gap-1.5"
                    >
                        <DecimalAge birthDate="2002-09-02T03:24:00" />
                        years
                    </span>
                </div>
                <div
                    class="flex justify-between items-center border-b border-border/50 pb-1"
                >
                    <span class="font-bold">Education</span>
                    <span class="text-muted-foreground text-right">
                        Non-technical
                    </span>
                </div>
            </div>
        </section>

        <section class="flex flex-col">
            <p class="font-semibold">languages.</p>
            <div class="flex flex-col gap-2 text-sm mt-2">
                <div
                    class="flex justify-between border-b border-border/50 pb-1"
                >
                    <span class="font-bold">Ukrainian</span>
                    <span class="text-muted-foreground"> Native </span>
                </div>
                <div
                    class="flex justify-between border-b border-border/50 pb-1"
                >
                    <span class="font-bold">Russian</span>
                    <span class="text-muted-foreground"> Native </span>
                </div>
                <div
                    class="flex justify-between border-b border-border/50 pb-1"
                >
                    <span class="font-bold">English</span>
                    <span class="text-muted-foreground">
                        Upper-Intermediate (B2)
                    </span>
                </div>
            </div>
        </section>
    </div>

    <section class="mt-4">
        <p class="font-semibold">skills.</p>

        <div class="mt-2 flex flex-row flex-wrap gap-2">
            {#each skillsStack as skill (skill)}
                <Badge label={skill} />
            {/each}
        </div>

        <p class="mt-2 mb-1 text-sm">Additional stack:</p>
        <div class="flex flex-row flex-wrap gap-2">
            {#each skillsStackAdditional as skill (skill)}
                <Badge label={skill} />
            {/each}
        </div>
    </section>

    <section class="mt-4">
        <p class="font-semibold">journey.</p>
        <div class="flex flex-col gap-6 pt-2">
            <JourneyCard
                title="Front-end developer"
                companyTitle="Intetics Team"
                companyUrl="https://intetics.com/"
                workingDates="nov 20224 - now"
                description="Building web applications with React, Next.js, and TypeScript. I work on a diverse range of projects, from single-page apps to complex admin panels. Mainly as outsource."
            />
            <JourneyCard
                title="Full-stack Developer"
                companyTitle="Freelance"
                companyUrl={undefined}
                workingDates="nov 2024 - now"
                description="As a freelance developer, I take full ownership of building modern web applications. I use a powerful stack including React, Svelte, Vue and TypeScript to deliver production-ready code for my clients."
            />
            <JourneyCard
                title="Android&iOS Developer"
                companyTitle="AppLead Pro & VIPAPP & Gravity"
                companyUrl={undefined}
                workingDates="jan 2019 - dec 2024"
                description="For more than four years, I was deeply immersed in native mobile development. This foundational chapter of my career was spent building, launching, and maintaining robust applications for both Android (Kotlin) and iOS (Swift)."
            />
        </div>
    </section>

    <section class="flex flex-col" hidden={true}>
        <p class="font-semibold">devices.</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-2">
            <div class="p-3 border rounded-lg bg-card/30">
                <h3
                    class="font-semibold text-muted-foreground mb-2 text-xs uppercase tracking-wider"
                >
                    Workstations
                </h3>
                <ul class="list-disc list-inside space-y-1">
                    <li>PC: AMD Ryzen 7 5700X</li>
                    <li>MacBook Air M1 8/256</li>
                </ul>
            </div>
            <div class="p-3 border rounded-lg bg-card/30">
                <h3
                    class="font-semibold text-muted-foreground mb-2 text-xs uppercase tracking-wider"
                >
                    Home Lab
                </h3>
                <ul class="list-disc list-inside space-y-1">
                    <li>HP Elitedesk G4 DM</li>
                </ul>
            </div>
            <div class="p-3 border rounded-lg bg-card/30">
                <h3
                    class="font-semibold text-muted-foreground mb-2 text-xs uppercase tracking-wider"
                >
                    Mobile
                </h3>
                <ul class="list-disc list-inside space-y-1">
                    <li>iPhone 12 256Gb (Main)</li>
                    <li class="text-muted-foreground">OnePlus Nord N10</li>
                    <li class="text-muted-foreground">Xiaomi Redmi Note 9</li>
                    <li class="text-muted-foreground">Xiaomi Redmi S2</li>
                </ul>
            </div>
            <div class="p-3 border rounded-lg bg-card/30">
                <h3
                    class="font-semibold text-muted-foreground mb-2 text-xs uppercase tracking-wider"
                >
                    Entertainment
                </h3>
                <ul class="list-disc list-inside space-y-1">
                    <li class="flex items-center gap-2">
                        Nintendo Switch rev 2
                    </li>
                    <li class="flex items-center gap-2">Oculus Quest 2</li>
                </ul>
            </div>
        </div>
    </section>

    <section class="mt-4">
        <p class="font-semibold">contact.</p>
        <p>
            interested in a conversation? drop dm's over
            <StyledLink href={myUrls.linkedin}>Linkedin</StyledLink>,
            <StyledLink href={myUrls.telegram}>Telegram</StyledLink> or
            <StyledLink href={'mailto:' + myEmail}>
                {myEmail}
            </StyledLink>. ask me anything about my work, projects, or anything
            else.
        </p>
    </section>

    <section class="mt-4">
        <div class="flex flex-row gap-2 text-muted-foreground">
            <p>version {APP_VERSION}</p>
            <!-- | -->
            <!-- <StyledLink href="/status">status</StyledLink> -->
        </div>
    </section>
</div>
