import schedule from 'node-schedule'
import fs from 'fs'
import dir from './dir'

const SCHEDULE = process.env.SCHEDULE

const run = () => {
  if (!SCHEDULE) return
  schedule.scheduleJob(SCHEDULE, function () {
    if (fs.existsSync(dir)) fs.rmdirSync(dir, { recursive: true })
  })
}

export default run()
