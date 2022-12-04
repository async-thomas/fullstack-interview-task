const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const request = require("request")
const axios = require("axios")
const {processInvestmentReport} = require("./investments")
const {convDataArrToCsv} = require("./util/utility")

const app = express()

app.use(bodyParser.json({limit: "10mb"}))

app.get("/investments/:id", (req, res) => {
  const {id} = req.params
  request.get(
    `${config.investmentsServiceUrl}/investments/${id}`,
    (e, r, investments) => {
      if (e) {
        console.error(e)
        res.send(500)
      } else {
        res.send(investments)
      }
    },
  )
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
