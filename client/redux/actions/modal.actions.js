export const UPDATE_MODAL_DATA = "UPDATE_MODAL_DATA";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const SHOW_MODAL = "SHOW_MODAL";

export const updateModalData = (url, apiData) => {
  return {
    type: UPDATE_MODAL_DATA,
    payload: {
      image: url,
      headline: apiData.headline.main,
      snippet: apiData.lead_paragraph,
      source: apiData.source,
      show: false
    }
  };
};

export const showModal = () => ({
  type: SHOW_MODAL
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});
