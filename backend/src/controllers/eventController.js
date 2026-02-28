const Event = require('../models/Event');

// ── all events (public) ───────────────────────────────────────────────────────
exports.getEvents = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;

    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Event.countDocuments(filter);
    const events = await Event.find(filter)
      .select('-registeredStudents')
      .skip(skip)
      .limit(Number(limit))
      .sort({ date: 1 });

    res.json({
      success: true,
      data: {
        events,
        pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
      },
    });
  } catch (err) {
    next(err);
  }
};

// ── student's registrations (protected) ──────────────────────────────────────
exports.getMyRegistrations = async (req, res, next) => {
  try {
    const events = await Event.find({ registeredStudents: req.user._id, isActive: true }).sort({ date: 1 });
    res.json({ success: true, data: { events } });
  } catch (err) {
    next(err);
  }
};

// ── event detail (public) ─────────────────────────────────────────────────────
exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event || !event.isActive) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    const registeredCount = event.registeredStudents.length;
    const eventData = event.toObject();
    delete eventData.registeredStudents;
    res.json({ success: true, data: { event: { ...eventData, registeredCount } } });
  } catch (err) {
    next(err);
  }
};

// ── register for event (protected) ───────────────────────────────────────────
exports.registerForEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event || !event.isActive) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.registeredStudents.map(String).includes(String(req.user._id))) {
      return res.status(409).json({ success: false, message: 'Already registered for this event' });
    }

    if (event.registrationLimit && event.registeredStudents.length >= event.registrationLimit) {
      return res.status(409).json({ success: false, message: 'Event registration limit reached' });
    }

    event.registeredStudents.push(req.user._id);
    await event.save();

    res.json({ success: true, message: 'Registered for event successfully' });
  } catch (err) {
    next(err);
  }
};
