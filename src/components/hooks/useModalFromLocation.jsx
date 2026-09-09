import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useModalFromLocation(dataArray, setSelectedItem) {
  const location = useLocation();
// MOVE USER TO MY MOVIES/SERIES REVIEW IF CLICKED //

  useEffect(() => {
    if (location.state && location.state.openModalId) {
      const itemToOpen = dataArray.find(
        (item) => item.id === location.state.openModalId
      );

      if (itemToOpen) {
        setSelectedItem(itemToOpen);
        window.history.replaceState({}, document.title);
      }
    }
  }, [location.state, dataArray, setSelectedItem]);
}