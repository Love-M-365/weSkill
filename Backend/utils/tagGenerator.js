exports.generateTags = (comments) => {
    // Simple logic to generate tags from comments
    const tags = [];
    comments.forEach(comment => {
      const words = comment.split(' ');
      words.forEach(word => {
        if (!tags.includes(word) && word.length > 3) tags.push(word);
      });
    });
    return tags;
  };