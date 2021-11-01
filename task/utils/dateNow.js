var m = new Date();
// formate timestamp of today to GCP BigQuery datetime  
exports.dateNow =
    m.getUTCFullYear() + "-" +
    ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
    ("0" + m.getUTCDate()).slice(-2) + " " +
    ("0" + m.getUTCHours()).slice(-2) + ":" +
    ("0" + m.getUTCMinutes()).slice(-2) + ":" +
    ("0" + m.getUTCSeconds()).slice(-2);
