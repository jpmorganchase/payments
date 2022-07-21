app.get('/status', function(req, res) {
    const items = ['hello', 'world']
    res.json({ success: 'get call succeed!', items });
  });