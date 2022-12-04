const R = require("ramda")

const convDataArrToCsv = (dataArr) =>
  R.pipe(
    R.map((row) =>
      R.pipe(
        R.map((item) => JSON.stringify(item)),
        R.join(","),
      )(row),
    ),
    R.join("\n"),
  )(dataArr)

module.exports.convDataArrToCsv = convDataArrToCsv
