const MOCK_COLLEGES = [
  { id: "C-1", name: "IIT Bombay", location: "Mumbai", rating: 4.9 },
  { id: "C-2", name: "BITS Pilani", location: "Pilani", rating: 4.8 },
  { id: "C-3", name: "SRM University", location: "Chennai", rating: 4.2 },
];

const MOCK_BROCHURES = [
  { id: "B-101", college: "IIT Bombay", courses: ["B.Tech", "M.Tech", "PhD"], fileSize: "4.2 MB" },
  { id: "B-102", college: "BITS Pilani", courses: ["B.E", "M.E", "MBA"], fileSize: "5.8 MB" },
];

exports.getAllColleges = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, colleges: MOCK_COLLEGES });
  } catch (err) {
    next(err);
  }
};

exports.getBrochures = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, brochures: MOCK_BROCHURES });
  } catch (err) {
    next(err);
  }
};
