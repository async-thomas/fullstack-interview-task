const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const axios = require("axios")
const {processInvestmentReport} = require("./investments")
const {convDataArrToCsv} = require("./util/utility")

const app = express()

app.use(bodyParser.json({limit: "10mb"}))

app.get("/investments/:id", async (req, res) => {
  const {id} = req.params
  try {
    const investments = await axios.get(
      `${config.investmentsServiceUrl}/investments/${id}`,
    )

    if (!investments) {
      throw new Error()
    }

    res.send(investments.data)
  } catch (err) {
    console.error("Error retrieving investments", err)
    res
      .status(500)
      .send("Problem retrieving investments, please try again later")
  }
})

app.get("/report", async (req, res) => {
  try {
    const [investments, companies] = await axios.all([
      axios.get(`${config.investmentsServiceUrl}/investments`),
      axios.get(`${config.financialCompaniesServiceUrl}/companies`),
    ])

    if (!investments || !companies) {
      throw new Error()
    }

    const csvReportHeaders = [
      "User",
      "First Name",
      "Last Name",
      "Date",
      "Holding",
      "Value",
    ]
    const csvReportData = processInvestmentReport(
      investments.data,
      companies.data,
    )
    const csvReport = convDataArrToCsv([csvReportHeaders, ...csvReportData])

    await axios.post(`${config.investmentsServiceUrl}/investments/export`, {
      csvReport,
    })

    res.send("Report successfully generated")
  } catch (err) {
    console.error("Error retrieving report", err)
    res.status(500).send("Problem retrieving report, please try again later")
  }
})

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
