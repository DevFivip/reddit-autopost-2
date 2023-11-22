import cron from 'node-cron';
import { getAll } from 'prisma/posts';
const schedule = () => {
    cron.schedule('* * * * * *', async () => {
         const res = await getAll();
         console.log(res);
        console.log('running a task every second');
    });
}
schedule()



export default schedule