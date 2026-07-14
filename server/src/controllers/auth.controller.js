const { generateToken } = require("../utils/jwt");

// Mock users for quick demo and authentication validation
const MOCK_USERS = [
  { id: 1, name: "Aditya Kumar", email: "aditya@degreefyd.com", password: "password123", role: "Counselor" },
  { id: 2, name: "Ramesh Singh", email: "ramesh@degreefyd.com", password: "password123", role: "Supervisor" },
];

exports.login = async (req, res, next) => {
  const { email, password, role } = req.body;

  try {
    if (!email || !password || !role) {
      return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user || user.password !== password || user.role !== role) {
      return res.status(401).json({ success: false, message: "Invalid email, password, or role selection" });
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = MOCK_USERS.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};
