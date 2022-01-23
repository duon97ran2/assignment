export const reRender = async (component, dom) => {
  if (component) {
    document.querySelector(dom).innerHTML = await component.render();
    component.afterRender();
  }
};