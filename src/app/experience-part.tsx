import {BlockHeader} from '@/components/block-header';
import {ExperienceCard} from '@/components/experience-card';
import {FileText} from 'lucide-react';

export function ExperiencePart() {
    return (
        <>
            <BlockHeader emoji="✨" title="Experience" />
            <ExperienceCard
                title="Mobile Developer"
                description="For more than three years, I was deeply immersed in native mobile development. This foundational chapter of my career was spent building, launching, and maintaining robust applications for both Android (Kotlin) and iOS (Swift)."
                startDate="2017"
                endDate="2024"
                tags={['kotlin', 'swift', 'android', 'ios', 'multiplatform']}
            />
            <ExperienceCard
                title="Freelance Full-stack Developer"
                description="As a freelance developer, I take full ownership of building modern web applications. I use a powerful stack including React, Node.js, and TypeScript to deliver production-ready code for my clients."
                startDate="2024"
                endDate="PRESENT"
                tags={[
                    'nodejs',
                    'typescript',
                    'reactjs',
                    'nextjs',
                    'tailwindcss',
                ]}
            />
            {/*<ExperienceCard*/}
            {/*    title="Trainee Full-stack Developer"*/}
            {/*    description=""*/}
            {/*    startDate="2024"*/}
            {/*    endDate="2025"*/}
            {/*    tags={[*/}
            {/*        'nodejs',*/}
            {/*        'typescript',*/}
            {/*        'reactjs',*/}
            {/*        'nextjs',*/}
            {/*        'tailwindcss',*/}
            {/*    ]}*/}
            {/*/>*/}
            <a
                href="/"
                hidden={true}
                className="flex flex-row justify-end gap-2 text-slate-400 px-8"
            >
                <p className="text-sm">Download resume (PDF)</p>
                <FileText className="size-5" />
            </a>
        </>
    );
}
