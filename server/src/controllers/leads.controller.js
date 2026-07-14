let MOCK_LEADS = [
  { id: "L-9043", name: "Rohan Sharma", college: "IIT Delhi", course: "B.Tech CSE", status: "Fresh", source: "Website Form" },
  { id: "L-9042", name: "Ananya Iyer", college: "BITS Pilani", course: "M.Sc Economics", status: "Callback", source: "Direct Referral" },
  { id: "L-9041", name: "Kabir Mehta", college: "SRM Chennai", course: "BBA Finance", status: "Interested", source: "Google Ads" },
];

exports.getAllLeads = async (req, res, next) => {
  const { status } = req.query;
  try {
    let leads = [...MOCK_LEADS];
    if (status) {
      leads = leads.filter(l => l.status.toLowerCase() === status.toLowerCase());
    }
    res.status(200).json({ success: true, leads });
  } catch (err) {
    next(err);
  }
};

exports.getLeadById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const lead = MOCK_LEADS.find(l => l.id === id);
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }
    res.status(200).json({ success: true, lead });
  } catch (err) {
    next(err);
  }
};

exports.createLead = async (req, res, next) => {
  const { name, college, course, status, source } = req.body;
  try {
    const newLead = {
      id: `L-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      college,
      course,
      status: status || "Fresh",
      source: source || "Manual Entry"
    };
    MOCK_LEADS.unshift(newLead);
    res.status(201).json({ success: true, lead: newLead });
  } catch (err) {
    next(err);
  }
};

exports.updateLead = async (req, res, next) => {
  const { id } = req.params;
  const { status, name, college, course } = req.body;
  try {
    const leadIdx = MOCK_LEADS.findIndex(l => l.id === id);
    if (leadIdx === -1) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    const updatedLead = {
      ...MOCK_LEADS[leadIdx],
      ...(status && { status }),
      ...(name && { name }),
      ...(college && { college }),
      ...(course && { course })
    };

    MOCK_LEADS[leadIdx] = updatedLead;
    res.status(200).json({ success: true, lead: updatedLead });
  } catch (err) {
    next(err);
  }
};
