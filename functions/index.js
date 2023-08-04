const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { getRandomPlayer } = require('./selectFeaturedPlayer');

admin.initializeApp();

const db = admin.firestore();

function formatDate(date) {
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
const year = date.getFullYear();
return `${month}${day}${year}`;
}

exports.selectFeaturedPlayer = functions.pubsub
.schedule('5 0 * * *')
.timeZone('Asia/Manila')
.onRun(async (context) => {
    try {
    const playerData = await getRandomPlayer();

    if (!playerData) {
        console.error('No players found in the API.');
        return null;
    }

    const currentDate = new Date();
    const documentId = formatDate(currentDate);

    await db.collection('featuredPlayers').doc(documentId).set(playerData);

    console.log('Random player fetched and stored in Firestore with ID:', documentId);
    return null;
    } catch (error) {
    console.error('Error fetching or storing player data:', error);
    return null;
    }
});