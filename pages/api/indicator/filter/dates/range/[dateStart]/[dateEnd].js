import { searchDataByDateRange } from '@database/queries';

export default async function IndicatorByRangeDate(req, res) {
    try {
      const { dateStart, dateEnd, page = 1 } = req.query;
      const limit = 20;
      const offset = (page - 1) * limit;
  
      const data = await searchDataByDateRange(dateStart, dateEnd, limit, offset);
  
      if (data.indicadores.length=== 0) {
        res.status(404).json("Sorry, there are no records registered in the selected date range.");
      }
  
      const result = Object.assign({pagina:page},data)

      return res.status(200).json([result]);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Error retrieving indicators" });
    }
  }