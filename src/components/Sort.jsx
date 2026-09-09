import React from "react";

export const SortAll = (filteredMovies, sortBy) => {
  const sortedMovies = [...filteredMovies];

  const getMinutes = (timeString) => {
    if (!timeString) return 0;

    let minutes = 0;
    const hoursMatch = timeString.match(/(\d+)h/);
    const minutesMatch = timeString.match(/(\d+)m/);

    if (hoursMatch) minutes += parseInt(hoursMatch[1]) * 60;
    if (minutesMatch) minutes += parseInt(minutesMatch[1]);

    return minutes;
  };

  if (sortBy === "duration") {
    sortedMovies.sort(
      (a, b) => getMinutes(b.duration) - getMinutes(a.duration),
    );
  }
  if (sortBy === "high") {
    sortedMovies.sort((a, b) => b.rating - a.rating);
  }
  if (sortBy === "low") {
    sortedMovies.sort((a, b) => a.rating - b.rating);
  }
  if (sortBy === "imdb") {
    sortedMovies.sort((a, b) => b.rating - a.rating);
  }

  return sortedMovies;
};
