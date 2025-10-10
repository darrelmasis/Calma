import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config({ quiet: true })

const buildDate = new Date().toISOString().split('T')[0]

const humansContent = `# humans.txt - ${process.env.VITE_CALMA_NAME}
# This file gives credit to all contributors and provides basic info about the site.
# More info: https://humanstxt.org/

/* TEAM */
Developer: ${process.env.VITE_HUMANS_DEVELOPER_NAME}
Role: ${process.env.VITE_HUMANS_DEVELOPER_ROLE}
Email: ${process.env.VITE_HUMANS_DEVELOPER_EMAIL}
LinkedIn: ${process.env.VITE_HUMANS_DEVELOPER_LINKEDIN}
GitHub: ${process.env.VITE_HUMANS_DEVELOPER_GITHUB}

Content & Vision: ${process.env.VITE_CALMA_AUTHOR}
Role: Calma Owners
Contribution: Provided history, vision, mission, logos, photos, and content

Content Coordinator: ${process.env.VITE_HUMANS_COORDINATOR_NAME}
Role: Content Intermediary
Contribution: Scheduled appointments, collected content from owners, communicated updates

/* SITE */
Site: ${process.env.VITE_CALMA_NAME}
URL: ${process.env.VITE_CALMA_URL}
Technologies: ${process.env.VITE_HUMANS_TECH}

/* VERSION */
Build Date: ${buildDate}

/* THANKS */
Thanks to all collaborators, designers, and supporters who helped bring the project to life.
`

fs.writeFileSync('public/humans.txt', humansContent)
console.log('✅ humans.txt generado correctamente!')
