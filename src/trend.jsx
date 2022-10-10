
function Trend(props) {
    const dateCompose = (month, day) => {
        return month * 100 + day;
    };
    return {dateCompose: dateCompose};
}

export default Trend;
