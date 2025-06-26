const express = require('express');
const admin = require('firebase-admin');
const app = express();

app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(require('./service-account.json')),
});

app.post('/send', async (req, res) => {
  const { to, data } = req.body;
  const message = {
    data,
    token: to,
  };
  try {
    await admin.messaging().send(message);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));