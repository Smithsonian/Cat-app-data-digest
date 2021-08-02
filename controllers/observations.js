import Observation from '../models/Observation.js';
import downloadReport from '../utils/downloadReport.js';

export const getReport = async (req, res) => {
  const { startDate, endDate } = req.params;
  const query = {
    date_time_original: { $gte: startDate, $lt: endDate }
  };
  const fields = [
    {
      label: 'Observation ID',
      value: '_id'
    },
    {
      label: 'Deployment ID',
      value: 'deployment_id'
    },
    {
      label: 'Sequence ID',
      value: 'sequence_id'
    },
    {
      label: 'Cat ID',
      value: 'specimen'
    },
    {
      label: 'Pattern',
      value: 'pattern'
    },
    {
      label: 'Bicolor',
      value: 'bicolor'
    },
    {
      label: 'Long hair',
      value: 'longHair'
    },
    {
      label: 'Sex',
      value: 'sex'
    },
    {
      label: 'Notched ear',
      value: 'notched'
    },
    {
      label: 'Collar',
      value: 'collar'
    },
    {
      label: 'Latitude',
      value: 'location.coordinates[1]'
    },
    {
      label: 'Longitude',
      value: 'location.coordinates[0]'
    },
    {
      label: 'Date',
      value: 'date_time_original'
    }
  ];
  const data = await Observation.find(query);
  return downloadReport(res, 'report.csv', fields, data);
};

export const uploadCSV = async (req, res) => {
  res.send('hi');
};
