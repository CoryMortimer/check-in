const axios = require('axios').default;
const { BACKEND_URL } = process.env;

module.exports = async function (context, myTimer) {
    const timeStamp = new Date().toISOString();

    if (myTimer.IsPastDue)
    {
        context.log('JavaScript is running late!');
    }
    context.log('JavaScript timer trigger function ran!', timeStamp);

    axios.post(`${BACKEND_URL}/web-hook/send-newsletter`)
        .finally(() => {
            axios.post(`${BACKEND_URL}/web-hook/send-check-in`)
                .finally(() => context.done());
        });
};
