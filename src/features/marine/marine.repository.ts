import { 
  collection, 
  addDoc, 
  getDocs, 
  query as firestoreQuery, 
  orderBy, 
  limit,
  Timestamp,
  onSnapshot
} from 'firebase/firestore';
import { firestoreDb } from '../../config/firebase';

const FIRESTORE_COLLECTION = 'marine_environment_data';

const getMarineData = async () => {
  const marineCollection = collection(firestoreDb, FIRESTORE_COLLECTION);
  const q = firestoreQuery(
    marineCollection,
    orderBy('timestamp', 'desc'),
    limit(100)
  );
  
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) {
    return [];
  }

  const data: any[] = [];
  snapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data()
    });
  });

  return data;
};

// Get latest data
const getLatestData = async () => {
  const marineCollection = collection(firestoreDb, FIRESTORE_COLLECTION);
  const q = firestoreQuery(
    marineCollection,
    orderBy('timestamp', 'desc'),
    limit(1)
  );
  
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data()
  };
};

// Save to Firestore
const saveMarineData = async (
  wave_height: number,
  wind_direction: string,
  wind_speed: number,
  wave_period?: number,
  wave_frequency?: number,
  wave_intensity?: number
) => {
  const marineCollection = collection(firestoreDb, FIRESTORE_COLLECTION);
  
  const newData: any = {
    wave_height,
    wind_direction,
    wind_speed,
    timestamp: Timestamp.now()
  };
  
  // Tambahkan field opsional
  if (wave_period !== undefined) newData.wave_period = wave_period;
  if (wave_frequency !== undefined) newData.wave_frequency = wave_frequency;
  if (wave_intensity !== undefined) newData.wave_intensity = wave_intensity;
  
  const result = await addDoc(marineCollection, newData);

  return {
    id: result.id,
    ...newData,
  };
};

const postMarineData = async (
  wave_height: number,
  wind_direction: string,
  wind_speed: number,
  wave_period?: number,
  wave_frequency?: number,
  wave_intensity?: number
) => {
  return await saveMarineData(
    wave_height, 
    wind_direction, 
    wind_speed,
    wave_period,
    wave_frequency,
    wave_intensity
  );
};

// Fungsi untuk mendapatkan data secara real-time
const subscribeToMarineData = (callback: (data: any[]) => void) => {
  const marineCollection = collection(firestoreDb, FIRESTORE_COLLECTION);
  const q = firestoreQuery(
    marineCollection,
    orderBy('timestamp', 'desc'),
    limit(100)
  );

  return onSnapshot(q, (snapshot) => {
    const data: any[] = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data()
      });
    });
    callback(data);
  }, (error) => {
    console.error('Error in real-time subscription:', error);
    callback([]);
  });
};

export const marineRepository = {
  getMarineData,
  getLatestData,
  postMarineData,
  saveMarineData,
  subscribeToMarineData,
};
