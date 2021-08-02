import Observation from '../models/Observation.js';
import downloadReport from '../utils/downloadReport.js';

export const getReport = async (req, res) => {
  const fields = [
    {
      label: 'Observation ID',
      value: '_id'
    },
    {
      label: 'Date',
      value: 'date_time_original'
    }
  ];
  const data = await Observation.find();
  return downloadReport(res, 'report.csv', fields, data);
};

export const uploadCSV = async (req, res) => {
  res.send('hi');
};
