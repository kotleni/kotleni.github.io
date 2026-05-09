type DetailResolver = () => string;

interface Detail {
    title: string;
    resolver: DetailResolver;
}

interface Social {
    name: string;
    url: string;
}

interface Bio {
    fullName: string;
    description: string;
    details: Detail[];
    stack: string[];
    additional: string[];
    socials: Social[];
    email: string;
}

class BioBuilder {
    private data: Bio = {
        fullName: '',
        description: '',
        details: [],
        stack: [],
        additional: [],
        socials: [],
        email: ''
    };

    base(fullName: string, description: string): this {
        this.data.fullName = fullName;
        this.data.description = description;
        return this;
    }

    detail(title: string, resolver: DetailResolver): this {
        this.data.details.push({ title, resolver });
        return this;
    }

    contact(name: string, url: string): this {
        this.data.socials.push({ name, url });
        return this;
    }

    mail(email: string): this {
        this.data.email = email;
        return this;
    }

    skills(stack: string[], additional: string[]): this {
        this.data.stack = stack;
        this.data.additional = additional;
        return this;
    }

    build(): Bio {
        return this.data;
    }
}

const bio = new BioBuilder()
    .base('Viktor Varenik', `I'm a Full Stack Software Engineer | Infrastructure & DevOps focused on software efficiency, simplicity and freedom. I also enjoy recreational programming, reverse engineering and networking. Previously, I developed native mobile applications for Android and iOS.`)
    .detail('Location', () => 'Ukraine')
    .detail('Timezone', () => 'GMT+3')
    .detail('Age', () => '23')
    .skills(
        ['typescript', 'reactjs', 'nextjs', 'nestjs', 'prisma', 'sql', 'docker', 'linux'],
        ['kotlin', 'java', 'swift', 'clang', 'c++', 'python']
    )
    .mail('yavarenikya@gmail.com')
    .contact('Github', 'https://github.com/kotleni')
    .contact('Twitter', 'https://x.com/kotleni_')
    .contact('Linkedin', 'https://www.linkedin.com/in/kotleni/')
    .contact('Telegram', 'https://t.me/kotleni')
    .build();

export function RootPage() {
    return (
        <main className="max-w-2xl mx-auto py-20 px-6 font-mono text-sm antialiased text-zinc-400 selection:bg-zinc-800">
            <section className="mb-16">
                <h1 className="text-white text-lg font-bold mb-4 uppercase tracking-tighter">{bio.fullName}</h1>
                <p className="leading-relaxed border-l-2 border-zinc-800 pl-4 italic">{bio.description}</p>
            </section>

            <section className="mb-16">
                <h2 className="text-zinc-600 mb-6 text-xs uppercase tracking-widest font-bold">Info</h2>
                <div className="space-y-2">
                    {bio.details.map((d, i) => (
                        <div key={i} className="flex gap-4">
                            <span className="text-zinc-500 w-24 shrink-0">{d.title}</span>
                            <span className="text-zinc-300">{d.resolver()}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-zinc-600 mb-6 text-xs uppercase tracking-widest font-bold">tracking-tighter</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {bio.stack.map(s => <span key={s} className="text-zinc-200">[{s}]</span>)}
                    {bio.additional.map(s => <span key={s} className="text-zinc-600">{s}</span>)}
                </div>
            </section>

            <section>
                <h2 className="text-zinc-600 mb-6 text-xs uppercase tracking-widest font-bold">Connect</h2>
                <div className="flex flex-col gap-2">
                    <a href={`mailto:${bio.email}`} className="hover:text-white transition-colors underline decoration-zinc-800 underline-offset-4">email: {bio.email}</a>
                    <div className="flex gap-4 mt-2">
                        {bio.socials.map(s => (
                            <a key={s.name} href={s.url} className="text-zinc-500 hover:text-zinc-200 transition-colors">
                                /{s.name.toLowerCase()}
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
