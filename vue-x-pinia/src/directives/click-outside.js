const clickOutsideDirective = {
  mounted(el, binding) {
    el.__ClickOutsideHandler = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.body.addEventListener("click", el.__ClickOutsideHandler);
  },
  unmounted(el) {
    document.removeEventListener("click", el.__ClickOutsideHandler)
  }
};

export default clickOutsideDirective;