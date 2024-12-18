import React, { useState } from 'react';
import { Book, Award } from 'lucide-react';

function ConfigScreen({ onStartQuiz }) {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onStartQuiz(category, difficulty);
  };

  return (
    <form onSubmit={handleSubmit} className="config-screen">
      <h2>Configure Your Quiz</h2>
      
      <div className="form-group">
        <label>
          <Book size={24} />
          Category:
        </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
        </select>
      </div>

      <div className="form-group">
        <label>
          <Award size={24} />
          Difficulty:
        </label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button type="submit" className="btn btn-start">Start Quiz</button>
    </form>
  );
}

export default ConfigScreen;