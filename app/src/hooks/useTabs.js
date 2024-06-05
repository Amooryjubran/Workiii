import { useState } from "react";

export const useTabs = (initialTab) => {
  const [currentTab, setCurrentTab] = useState(initialTab);

  return {
    currentTab,
    setTab: setCurrentTab,
    isCurrentTab: (index) => currentTab === index,
  };
};
