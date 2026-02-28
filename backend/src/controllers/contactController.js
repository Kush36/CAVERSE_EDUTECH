const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');

// ── submit contact form (public) ──────────────────────────────────────────────
exports.submitContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
    }

    const { name, email, phone, subject, message } = req.body;
    const contact = await Contact.create({ name, email, phone, subject, message });

    res.status(201).json({
      success: true,
      message: 'Your message has been received. We will get back to you shortly.',
      data: { id: contact._id },
    });
  } catch (err) {
    next(err);
  }
};

// ── list all inquiries (admin) ────────────────────────────────────────────────
exports.getContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        contacts,
        pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
      },
    });
  } catch (err) {
    next(err);
  }
};

// ── mark as resolved (admin) ──────────────────────────────────────────────────
exports.resolveContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: 'resolved', resolvedAt: new Date() },
      { new: true }
    );
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });

    res.json({ success: true, message: 'Marked as resolved', data: { contact } });
  } catch (err) {
    next(err);
  }
};
