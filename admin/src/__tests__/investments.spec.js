const {processInvestmentReport} = require("../investments")

describe("Investment", () => {
  describe("Process Investment Report", () => {
    test("it correctly processes report", () => {
      const investments = [
        {
          id: "1",
          userId: "1",
          firstName: "Joanna",
          lastName: "Smith",
          investmentTotal: 18200,
          date: "2022-10-01",
          holdings: [{id: "3", investmentPercentage: 0.25}],
        },
        {
          id: "2",
          userId: "2",
          firstName: "Lucy",
          lastName: "Elis",
          investmentTotal: 8750,
          date: "2022-10-01",
          holdings: [
            {id: "2", investmentPercentage: 0.15},
            {id: "3", investmentPercentage: 0.85},
          ],
        },
      ]

      const companies = [
        {
          id: "1",
          name: "Company 123",
        },
        {
          id: "2",
          name: "Company 456",
        },
        {
          id: "3",
          name: "Company 789",
        },
      ]

      const output = [
        ["1", "Joanna", "Smith", "2022-10-01", "Company 789", 4550],
        ["2", "Lucy", "Elis", "2022-10-01", "Company 456", 1312.5],
        ["2", "Lucy", "Elis", "2022-10-01", "Company 789", 7437.5],
      ]

      expect(processInvestmentReport(investments, companies)).toEqual(output)
    })
  })
})
