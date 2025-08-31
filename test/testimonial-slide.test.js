import testimonialSlide from "../utils/testimonial-slide";

describe('createSliderController (pure logic)', () => {
  let controller;

  beforeEach(() => {
    controller = testimonialSlide.createSliderController(3);
  });

  test('starts at index 0', () => {
    expect(controller.getCurrentIndex()).toBe(0);
  });

  test('next() cycles forward', () => {
    controller.next();
    expect(controller.getCurrentIndex()).toBe(1);
    controller.next();
    expect(controller.getCurrentIndex()).toBe(2);
    controller.next();
    expect(controller.getCurrentIndex()).toBe(0); // wrap around
  });

  test('prev() cycles backward', () => {
    controller.prev();
    expect(controller.getCurrentIndex()).toBe(2); // wrap around
  });

  test('goTo() sets index correctly', () => {
    controller.goTo(1);
    expect(controller.getCurrentIndex()).toBe(1);
  });

  test('goTo() ignores invalid index', () => {
    controller.goTo(5);
    expect(controller.getCurrentIndex()).toBe(0); // unchanged
  });
});

jest.useFakeTimers();

describe('createAutoSlider', () => {
  test('calls onSlideChange immediately and every interval', () => {
    const callback = jest.fn();
    testimonialSlide.createAutoSlider(3, callback, 15000);

    // Immediately called once
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(0);

    // Advance time by 15 seconds
    jest.advanceTimersByTime(15000);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(1);

    // Advance again
    jest.advanceTimersByTime(15000);
    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith(2);

    // Loop back to first
    jest.advanceTimersByTime(15000);
    expect(callback).toHaveBeenCalledTimes(4);
    expect(callback).toHaveBeenCalledWith(0);
  });

  test('throws error if length is 0', () => {
    expect(() => testimonialSlide.createAutoSlider(0, jest.fn())).toThrow('Slider must have at least one item');
  });

  test('stop() clears the interval', () => {
    const callback = jest.fn();
    const slider = testimonialSlide.createAutoSlider(2, callback, 15000);

    slider.stop();
    jest.advanceTimersByTime(30000);
    expect(callback).toHaveBeenCalledTimes(1); // only initial call
  });
});
