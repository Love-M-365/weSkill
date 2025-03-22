const Comment = require('../models/Comment');
const { generateTags } = require('../utils/tagGenerator');

exports.addComment = async (req, res) => {
  const { workId, comment } = req.body;
  try {
    const newComment = new Comment({
      workId,
      userId: req.user.id,
      comment,
    });
    await newComment.save();

    const comments = await Comment.find({ workId });
    const tags = generateTags(comments.map((c) => c.comment));

    res.status(201).json({ newComment, tags });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
