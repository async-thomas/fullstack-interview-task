const convDataArrToCsv = (dataArr) => {
  const csvDataArr = []
  dataArr.forEach((arr) => {
    const dataRowArr = arr.map((item) => JSON.stringify(item))
    const dataRow = dataRowArr.join(",")
    csvDataArr.push(dataRow)
  })

  const csvData = csvDataArr.join("\n")
  return csvData
}

module.exports.convDataArrToCsv = convDataArrToCsv
