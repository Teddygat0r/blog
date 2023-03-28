export const convertMillisToAge = (date) => {
    const currentDate = Date.now();
    if (currentDate - date < 60000) {
        //Milliseconds in Min
        const seconds = parseInt((currentDate - date) / 1000);
        return `${ seconds } seconds ago`;
    } else if (currentDate - date < 3600000) {
        //Milliseconds in Hr
        const minutes = parseInt((currentDate - date) / 60000);
        return `${ minutes } minutes ago`;
    } else if (currentDate - date < 86400000) {
        //Milliseconds in Day
        const hours = parseInt((currentDate - date) / 3600000);
        return `${ hours } hours ago`;
    } else {
        const publishDate = new Date(date);
        return `${ publishDate.toLocaleString("en-US", {
            month: "short",
        }) } ${ publishDate.getDate() }, ${ publishDate.getFullYear() }`;
    }
}