const {convDataArrToCsv} = require("../util/utility")

describe("Utility", () => {
  describe("Convert Array of Arrays to CSV", () => {
    test("it converts an array of arrays to csv", () => {
      const dataInput = [
        ["User", "Name", "Age"],
        ["1", "Jeff", 23],
        ["2", "Brad", 55],
        ["3", "Vicky", 43],
      ]

      const output = `"User","Name","Age"
"1","Jeff",23
"2","Brad",55
"3","Vicky",43`

      expect(convDataArrToCsv(dataInput)).toEqual(output)
    })

    test("it correctly processes strings containing commas", () => {
      const dataInput = [
        ["User", "Company Name", "Age"],
        ["1", "Garden services, co.", 5],
        ["2", "Welding ltd.", 13],
        ["3", "Investment REIT, ABC", 4],
      ]

      const output = `"User","Company Name","Age"
"1","Garden services, co.",5
"2","Welding ltd.",13
"3","Investment REIT, ABC",4`

      expect(convDataArrToCsv(dataInput)).toEqual(output)
    })
  })
})
