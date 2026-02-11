import type { ResumeData } from '../types/resume';

export const initialResumeData: ResumeData = {
    profile: {
        name: 'Ishan Singh',
        title: '', // Removed default title to match screenshot
        email: 'ishansingh99@gmail.com',
        location: 'Bangalore, India',
        phone: '+91-9986309027',
        summary: "I take ambiguous, high-friction processes and turn them into reliable, repeatable systems. Then I automate what can be automated and move to the next problem.\nCurrently exploring operations roles in India's defense sector. Interested in companies where execution complexity is the bottleneck and where someone needs to own everything that isn't core engineering.",
        website: 'https://ishansingh.com',
        linkedin: 'https://www.linkedin.com/in/ishan-singh-945513210/',
        github: '' // Removed as requested
    },
    experience: [
        {
            id: '1',
            company: 'COMMENDA TECHNOLOGIES INC.',
            position: 'OPERATIONS | FOUNDERS OFFICE – SPECIAL PROJECTS',
            location: '',
            startDate: 'Aug 2024',
            endDate: 'Aug 2025',
            description: [
                'Partnered with engineering, design, and operations to translate real-world process gaps into product requirements and workflow tools.',
                'Conceived and shipped an internal workflow-tracking platform (from Figma prototype to launch), improving transparency and reducing manual updates for clients.',
                'Scaled incorporation volume from 5 to 65 per month while maintaining service quality through data-informed optimization.',
                'Established SLA tracking, KPI dashboards, and no-code automation systems, enabling continuous iteration without engineering dependency.',
                'Designed user-friendly internal tools with a low learning curve, ensuring adoption by accountants, company secretaries, and partner firms.'
            ]
        },
        {
            id: '2',
            company: 'THOROGOOD ASSOCIATES INDIA LTD.',
            position: 'DATA AND ANALYTICS CONSULTANT',
            location: '',
            startDate: 'Jul 2022',
            endDate: 'Jul 2024',
            description: [
                'Developed end-to-end data ingestion pipelines for a leading tobacco manufacturer, extracting insights from 25 years of data using SSMS, SSIS, SSAS Cube, and Power BI.',
                'Led migration to Azure PaaS, re-creating pipelines for 50 suppliers, saving the client $25.4M in processing costs. Utilized SSMS, Azure Data Factory, and Azure Databricks.',
                'Built a data pipeline to estimate the carbon footprint of global offices, processing invoices automatically with Azure\'s Document Intelligence and Hugging Face for text extraction. Estimated travel-related emissions for consultants for Eco Vadis approval certification.'
            ]
        },
        {
            id: '3',
            company: 'KPMG INDIA',
            position: 'RISK ADVISORY ANALYST | INTERN',
            location: '',
            startDate: 'Jan 2022',
            endDate: 'Jul 2022',
            description: [
                'Assisted with the internal audit of Verizon India, verifying controls in finance and payroll processes.',
                'Worked on Enterprise Asset Management for Saudi Telecom Network, identifying over $10M in untagged assets.',
                'Calculated Bharti Airtel’s carbon footprint and contributed to their net-zero strategy.',
                'Worked in PPP, drafted MTN SA\'s inventory return policy and employee retention program.',
                'Using SQL and Excel on an everyday basis to support other teams with their data cleaning and data analysis operations (Toll tax analysis).'
            ]
        }
    ],
    education: [
        {
            id: '1',
            school: 'MSRIT (MS Ramaiah Institute of Technology)',
            degree: 'B.E. (Mechanical)',
            fieldOfStudy: 'Mechanical Engineering',
            location: 'Bangalore',
            startDate: '2018',
            endDate: '2022',
            grade: '7.5 CGPA'
        }
    ],
    skills: [
        {
            category: 'Technical Skills',
            items: ['Python Programming', 'Azure Data Factory', 'MS SQL', 'Azure Databricks', 'Microsoft Power BI', 'MS Excel', 'MS PowerPoint', 'HTML', 'CSS']
        },
        {
            category: 'Functional Skills',
            items: ['Risk mitigation', 'Workflow automation and scaling', 'Incident response']
        }
    ]
};
