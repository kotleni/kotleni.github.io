import {ProjectsCards} from "../../../components/ProjectsCards";
import {PROJECTS_CARDS} from "../../../config.ts";

const ProjectsSection: React.FC = () => {
    return (
        <section>
            <header className="heading">
                <div><h2>Projects</h2>
                    <div className="description">Open-source projects I've worked on over the
                        years.
                    </div>
                </div>
                {/*<Link className="button" href="/projects">All Projects</Link>*/}
            </header>
            <ProjectsCards cards={PROJECTS_CARDS}/>
        </section>
    );
};

const ProjectsPage: React.FC = () => {
    return (
        <ProjectsSection />
    );
};

export {ProjectsPage};