function createSliderController(length) {
  let currentIndex = 0;

    function getCurrentIndex() {
        return currentIndex;
  }

  function next() {
    currentIndex = (currentIndex + 1) % length;
    return currentIndex;
  }

  function prev() {
    currentIndex = (currentIndex - 1 + length) % length;
    return currentIndex;
  }

  function goTo(index) {
    if (index >= 0 && index < length) {
      currentIndex = index;
      return currentIndex;
    }
  }

  return { next, prev, goTo, getCurrentIndex};
}

function createAutoSlider(length, onSlideChange, interval = 15000) {
  if (length <= 0) throw new Error('Slider must have at least one item');

  let currentIndex = 0;

  function next() {
    currentIndex = (currentIndex + 1) % length;
    onSlideChange(currentIndex);
  }

  // Start the interval loop
  const timer = setInterval(next, interval);

  // Initial trigger
  onSlideChange(currentIndex);

  return {
    stop: () => clearInterval(timer),
    getCurrentIndex: () => currentIndex
  };
}

export default {
    createSliderController,
    createAutoSlider
}

