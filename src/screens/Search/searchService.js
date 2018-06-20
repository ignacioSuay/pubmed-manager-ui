export const buildTerm = (term, dates) => {
    let res = "";

    Object.entries(term).forEach(entry => {
        if (entry[1]) {
            res += entry[1] + entry[0] + " AND ";
        }
    });

    if (Object.keys(dates).length !== 0) {
        res += buildDates(dates);
    }
    return res.replace(/AND\s$/, "").trim().replace(/\s/g, "+");
};

export const buildDates = (dates) => {

    let res = "";
    Object.entries(dates).forEach(entry => {
        if (entry[0].includes("from")) {
            const fieldName = entry[0].substring(entry[0].indexOf("from") + 4);
            const toKey = "to" + fieldName;
            if (dates[toKey]) {
                res += "(" + entry[1] + fieldName + ":" + dates[toKey] + fieldName + ") AND ";
            } else {
                res += "(" + entry[1] + fieldName + ":3000" + fieldName + ") AND ";
            }
        }
    });
    res = res.replace(/AND\s$/, "").trim().replace(/\s/g, "+");
    return res;

};
