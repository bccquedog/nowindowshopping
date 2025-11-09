import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

let firebaseConfig;
try {
  // Try local src/firebaseConfig (for both apps)
  firebaseConfig = require('../firebaseConfig').firebaseConfig;
} catch (e) {
  throw new Error('firebaseConfig.js not found in src directory.');
}

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

type Comment = {
  id: string;
  text: string;
};

const CommentsSection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'comments'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => {
        const data = doc.data();
        return { id: doc.id, text: data.text || '' };
      }));
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    await addDoc(collection(db, 'comments'), {
      text: input.trim(),
      timestamp: new Date(),
    });
    setInput('');
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white/90 rounded-lg shadow-lg p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-blue-700">Comments</h3>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-2 mb-4 sm:mb-6">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Share your thoughts..."
          className="flex-1 px-3 sm:px-4 py-2 sm:py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          disabled={loading}
        />
        <button
          type="submit"
          className="px-4 sm:px-4 py-2 sm:py-2 bg-pink-500 text-white rounded shadow hover:bg-pink-600 transition text-sm sm:text-base touch-manipulation"
          disabled={loading || !input.trim()}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
      <div className="space-y-3 sm:space-y-4">
        {comments.length === 0 && <div className="text-sm sm:text-base text-gray-500">No comments yet. Be the first!</div>}
        {comments.map((comment: Comment) => (
          <div key={comment.id} className="bg-blue-50 rounded p-3 text-blue-900 shadow text-sm sm:text-base">
            {comment.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection; 