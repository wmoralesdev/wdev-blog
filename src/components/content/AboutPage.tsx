import React, { FC, useId } from 'react';
import { Me } from '@components/info';
import { AboutPageProps } from '@pages/about';
import { BiBuildings } from 'react-icons/bi';
import classNames from 'classnames';
import { IconType } from 'react-icons/lib';
import { AnimatePresence, motion } from 'framer-motion';
import { ExperienceModel } from '@models/experience';
import Spotify from 'react-spotify-embed';
import useWindowSize from '@hooks/useWindowSize';
import logoFormats from '@assets/techs';

interface LogoContainerProps {
    colStart: string;
    rowStart: string;
    colSpan?: string;
    rowSpan?: string;
    Logo: IconType;
    legend: string;
    index: number;
    href: string;
    size?: 'sm' | 'lg' | 'wide';
    aspect?: 'square' | 'auto';
    orientation?: 'vertical' | 'horizontal';
    isHighlight?: boolean;
}

const variants = {
    hidden: { opacity: 0, x: -100, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
};

const LogoContainer: FC<LogoContainerProps> = ({
    colStart, rowStart, colSpan, rowSpan, legend, Logo, index, href, size = 'sm', aspect = 'square', orientation = 'vertical', isHighlight = false,
}) => (
    <motion.a
        className={classNames(
            'rounded-lg p-4 flex gap-2 cust-transition cursor-pointer hover:border-4',
            orientation === 'vertical' ? 'flex-col items-center justify-center' : 'flex-row justify-between items-center md:flex-col md:items-center md:justify-center',
            colStart,
            rowStart,
            colSpan,
            rowSpan,
            // eslint-disable-next-line no-nested-ternary
            aspect === 'square' ? 'aspect-square' : size !== 'wide' ? 'aspect-auto md:aspect-square' : 'aspect-auto',
            isHighlight ? 'bg-primary hover:border-white' : 'bg-light hover:border-primary',
        )}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: 'linear', duration: 0.3, delay: index * 0.1 }}
        href={href}
        target="_blank"
    >
        <Logo
            className={classNames(
                // eslint-disable-next-line no-nested-ternary
                size === 'lg'
                    ? 'w-4/5 h-4/5' : aspect === 'square'
                        ? 'w-1/2 h-1/2' : 'h-full w-auto md:h-1/2',
            )}
        />
        <h1 className={classNames(
            'padding',
            isHighlight ? 'gradient-inverted' : 'gradient',
            orientation === 'vertical' ? 'mt-auto' : 'mt-0 md:mt-auto',
            size === 'lg' ? 'text-xl' : 'text-base',
        )}
        >
            <span>{legend}</span>
        </h1>
    </motion.a>
);

const Workplace: FC<{ experience: ExperienceModel, index: number }> = ({ experience, index }) => (
    <motion.div
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: 'linear', duration: 0.3, delay: index * 0.2 }}
        className="w-full flex items-start justify-between gap-4 rounded-lg bg-light shadow-xl p-4 cust-transition group hover:bg-primary"
    >
        <div>
            <BiBuildings className="w-8 h-8 md:w-10 md:h-10" />
        </div>
        <div className="w-full">
            <h1 className="gradient padding text-xl w-full inline-flex justify-between items-center group-hover:gradient-inverted md:text-3xl">
                <span>
                    {experience.workplace}
                </span>
                <i className="font-light text-sm">
                    {new Date(experience.startDate).toLocaleDateString('en-us', { month: 'short', year: 'numeric' })}
                    /
                    {new Date(experience.endDate).toLocaleDateString('en-us', { month: 'short', year: 'numeric' })}
                </i>
            </h1>
            <h2 className="font-medium mb-2 md:text-xl">{experience.role.en}</h2>
            <p className="font-light md:text-lg">{experience.description.en}</p>
        </div>
    </motion.div>
);

const AboutPage: FC<AboutPageProps> = ({ experience }) => {
    const [experienceId, logoId] = [useId(), useId()];
    const { width } = useWindowSize();

    return (
        <div className="mb-10">
            <Me />
            <div className="mt-10">
                <span className="text-3xl"><span>Let&apos;s go step by step</span></span>
            </div>
            <div className="mt-2 w-full flex flex-col gap-2">
                <h3 className="gradient padding text-3xl"><span>These are the places I&apos;ve worked at 🏢</span></h3>
                <div className="w-full pb-2 flex flex-wrap gap-2 justify-between items-center text-lg my-1 md:text-xl">
                    <p className="inline-flex gap-2 items-center gradient padding rounded-full bg-light py-1 px-2 cursor-pointer cust-transition hover:bg-primary hover:gradient-inverted">
                        <span>3+</span>
                        Years of experience
                    </p>
                    <p className="inline-flex gap-2 items-center gradient padding rounded-full bg-light py-1 px-2 cursor-pointer cust-transition hover:bg-primary hover:gradient-inverted">
                        <span>Mid/Senior</span>
                        Software Engineer
                    </p>
                    <p className="inline-flex gap-2 items-center gradient padding rounded-full bg-light py-1 px-2 cursor-pointer cust-transition hover:bg-primary hover:gradient-inverted">
                        Main focus is
                        <span>.NET</span>
                    </p>
                </div>
                <AnimatePresence>
                    { experience && experience.map((exp, index) => <Workplace index={index} key={`${experienceId}-${index}`} experience={exp} />) }
                </AnimatePresence>
            </div>
            <div className="w-full mt-10">
                <span className="gradient padding text-3xl mb-4">
                    <h3>I love and I&apos;ve worked with these technologies 💻</h3>
                    <small className="text-lg md:text-xl">and this website uses the highlighted ones!</small>
                </span>
                <div className="grid grid-cols-6 grid-rows-12 gap-2 md:grid-rows-4">
                    <AnimatePresence>
                        { logoFormats.map((logo, index) => <LogoContainer {...logo} index={index} key={`${logoId}-${index}`} />) }
                    </AnimatePresence>
                </div>
            </div>
            <div className="w-full mt-10">
                <h3 className="gradient padding text-3xl mb-4"><span>My coding playlist 💿</span></h3>
                <Spotify width="100%" wide={width <= 768} link="https://open.spotify.com/playlist/31QY6EFWL6jzgxFreQwybj?si=ffaf7f36b73b436a&pt=009319dffb77eab8a79527fd62c58a52" />
            </div>
        </div>
    );
};

export default AboutPage;
