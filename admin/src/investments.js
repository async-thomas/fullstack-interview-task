const R = require("ramda")

const processInvestmentReport = (investments, companies) => {
  const mappedData = []
  investments.forEach((investment) => {
    investment.holdings.forEach((holding) => {
      const company = R.find(R.propEq("id", holding.id))(companies)

      const csvDataItem = [
        investment.userId,
        investment.firstName,
        investment.lastName,
        investment.date,
        company.name,
        holding.investmentPercentage * investment.investmentTotal,
      ]
      mappedData.push(csvDataItem)
    })
  })
  return mappedData
}

module.exports.processInvestmentReport = processInvestmentReport
