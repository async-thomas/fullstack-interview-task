const R = require("ramda")

const convDataArrToCsv = R.pipe(
  R.map((row) =>
    R.pipe(
      R.map((item) => JSON.stringify(item)),
      R.join(","),
    )(row),
  ),
  R.join("\n"),
)

module.exports.convDataArrToCsv = convDataArrToCsv
