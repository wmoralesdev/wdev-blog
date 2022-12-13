import React, { FC, useId } from 'react';
import { Me } from '@components/info';
import { AboutPageProps } from '@pages/about';
import {
    SiExpress, SiDotnet, SiDocker, SiNextdotjs, SiPostgresql,
    SiMysql, SiMicrosoftsqlserver, SiMongodb, SiReact, SiNestjs, SiTailwindcss,
    SiGraphql, SiGit, SiAmazonaws, SiTypescript,
} from 'react-icons/si';
import { BiBuildings } from 'react-icons/bi';
import classNames from 'classnames';
import { IconType } from 'react-icons/lib';
import { AnimatePresence, motion } from 'framer-motion';
import { ExperienceModel } from '@models/experience';

interface LogoContainerProps {
    colStart: string;
    rowStart: string;
    colSpan?: string;
    rowSpan?: string;
    Logo: IconType;
    legend: string;
    size?: 'sm' | 'lg' | 'wide';
    aspect?: 'square' | 'auto';
    index: number;
    orientation?: 'vertical' | 'horizontal';
}

const variants = {
    hidden: { opacity: 0, x: -100, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
};

const LogoContainer: FC<LogoContainerProps> = ({
    colStart, rowStart, colSpan, rowSpan, legend, Logo, index, size = 'sm', aspect = 'square', orientation = 'vertical',
}) => (
    <motion.div
        className={classNames(
            'bg-light rounded-lg p-4 flex gap-2 cust-transition group cursor-default hover:bg-primary',
            orientation === 'vertical' ? 'flex-col items-center justify-center' : 'flex-row justify-between items-center md:flex-col md:items-center md:justify-center',
            colStart,
            rowStart,
            colSpan,
            rowSpan,
            // eslint-disable-next-line no-nested-ternary
            aspect === 'square' ? 'aspect-square' : size !== 'wide' ? 'aspect-auto md:aspect-square' : 'aspect-auto',
        )}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: 'linear', duration: 0.3, delay: index * 0.1 }}
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
            'gradient padding group-hover:gradient-inverted',
            orientation === 'vertical' ? 'mt-auto' : 'mt-0 md:mt-auto',
            size === 'lg' ? 'text-xl' : 'text-base',
        )}
        >
            <span>{legend}</span>
        </h1>
    </motion.div>
);

const logoFormats = [
    {
        colStart: 'col-start-1 md:col-start-1',
        rowStart: 'row-start-1 md:row-start-1',
        Logo: SiDotnet,
        colSpan: 'col-span-3 md:col-span-2',
        rowSpan: 'row-span-3 md:row-span-2',
        legend: '.NET',
        size: 'lg' as const,
    },
    {
        colStart: 'col-start-4 md:col-start-3',
        rowStart: 'md:row-start-1',
        Logo: SiNextdotjs,
        colSpan: 'col-span-3 md:col-span-1',
        rowSpan: 'row-span-1 md:row-span-1',
        legend: 'NextJS',
        aspect: 'auto' as const,
        orientation: 'horizontal' as const,
    },
    {
        colStart: 'col-start-4',
        rowStart: 'row-start-2 md:row-start-1',
        Logo: SiExpress,
        colSpan: 'col-span-3 md:col-span-1',
        rowSpan: 'row-span-1 md:row-span-1',
        legend: 'ExpressJS',
        aspect: 'auto' as const,
        orientation: 'horizontal' as const,
    },
    {
        colStart: 'col-start-1 md:col-start-5',
        rowStart: 'row-start-4 md:row-start-1',
        Logo: SiMysql,
        colSpan: 'col-span-3 md:col-span-1',
        rowSpan: 'row-span-1 md:row-span-1',
        legend: 'MySQL',
        aspect: 'auto' as const,
        orientation: 'horizontal' as const,
    },
    {
        colStart: 'col-start-4 md:col-start-6',
        rowStart: 'row-start-6 md:row-start-1',
        Logo: SiDocker,
        colSpan: 'col-span-3 md:col-span-1',
        rowSpan: 'row-span-3 md:row-span-1',
        legend: 'Docker',
        aspect: 'auto' as const,
    },
    {
        colStart: 'col-start-1 md:col-start-3',
        rowStart: 'row-start-7 md:row-start-2',
        Logo: SiMongodb,
        colSpan: 'col-span-3 md:col-span-1',
        rowSpan: 'row-span-1 md:row-span-1',
        legend: 'MongoDb',
        aspect: 'auto' as const,
        orientation: 'horizontal' as const,
    },
    {
        colStart: 'col-start-4',
        rowStart: 'row-start-3 md:row-start-2',
        Logo: SiReact,
        colSpan: 'col-span-3 md:col-span-2',
        rowSpan: 'row-span-3 md:row-span-2',
        legend: 'ReactJS',
        size: 'lg' as const,
    },
    {
        colStart: 'col-start-4 md:col-start-6',
        rowStart: 'row-start-[10] md:row-start-2',
        Logo: SiPostgresql,
        colSpan: 'col-span-3 md:col-span-1',
        rowSpan: 'row-span-1 md:row-span-1',
        legend: 'PostgreSQL',
        aspect: 'auto' as const,
        orientation: 'horizontal' as const,
    },
    {
        colStart: 'col-start-1',
        rowStart: 'row-start-[12] md:row-start-3',
        Logo: SiTailwindcss,
        colSpan: 'col-span-6 md:col-span-2',
        rowSpan: 'row-span-1',
        legend: 'Tailwindcss',
        aspect: 'auto' as const,
        orientation: 'horizontal' as const,
        size: 'wide' as const,
    },
    {
        colStart: 'col-start-1 md:col-start-3',
        rowStart: 'row-start-6 md:row-start-3',
        Logo: SiMicrosoftsqlserver,
        legend: 'MSSQL',
        colSpan: 'col-span-3 md:col-span-1',
        rowSpan: 'row-span-1 md:row-span-1',
        aspect: 'auto' as const,
        orientation: 'horizontal' as const,
    },
    {
        colStart: 'col-start-4 md:col-start-6',
        rowStart: 'row-start-8 md:row-start-3',
        Logo: SiNestjs,
        colSpan: 'col-span-3 md:col-span-1',
        rowSpan: 'row-span-1 md:row-span-1',
        legend: 'NestJS',
        aspect: 'auto' as const,
        orientation: 'horizontal' as const,
    },
    {
        colStart: 'col-start-1 md:col-start-1',
        rowStart: 'row-start-[8] md:row-start-4',
        Logo: SiGit,
        colSpan: 'col-span-3 md:col-span-1',
        rowSpan: 'row-span-3 md:row-span-1',
        legend: 'Git',
        size: 'wide' as const,
    },
    {
        colStart: 'col-start-1 md:col-start-2',
        rowStart: 'row-start-5 md:row-start-4',
        Logo: SiTypescript,
        colSpan: 'col-span-3 md:col-span-2',
        rowSpan: 'row-span-1 md:row-span-1',
        legend: 'TypeScript',
        aspect: 'auto' as const,
        orientation: 'horizontal' as const,
        size: 'wide' as const,
    },
    {
        colStart: 'col-start-4',
        rowStart: 'row-start-[11] md:row-start-4',
        Logo: SiGraphql,
        colSpan: 'col-span-3 md:col-span-1',
        rowSpan: 'row-span-1 md:row-span-1',
        legend: 'GraphQL',
        aspect: 'auto' as const,
        orientation: 'horizontal' as const,
    },
    {
        colStart: 'col-start-1 md:col-start-5',
        rowStart: 'row-start-[11] md:row-start-4',
        Logo: SiAmazonaws,
        colSpan: 'col-span-3 md:col-span-2',
        rowSpan: 'row-span-1',
        legend: 'AWS',
        aspect: 'auto' as const,
        orientation: 'horizontal' as const,
        size: 'wide' as const,
    },
];

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

    return (
        <div>
            <Me />
            <div className="mt-10 w-full flex flex-col gap-2">
                <h1 className="gradient padding text-3xl"><span>These are the places I&apos;ve worked at</span></h1>
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
                <h1 className="gradient padding text-3xl mb-4"><span>I&apos;ve experience with these technologies</span></h1>
                <div className="grid grid-cols-6 grid-rows-12 gap-2 md:grid-rows-4">
                    <AnimatePresence>
                        { logoFormats.map((logo, index) => <LogoContainer {...logo} index={index} key={`${logoId}-${index}`} />) }
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;

// eslint-disable-next-line max-len
// if ((colSpan === undefined && rowSpan === undefined) || colSpan.last === rowSpan.last) aspect-square : aspect-auto
